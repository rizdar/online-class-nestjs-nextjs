import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import zoomConfig from 'src/config/zoom.config';
import { UtilsService } from 'src/utils/utils.service';
import { CacheService } from '../cache/cache.service';
import * as KJUR from 'jsrsasign';

export type MeetingParam = {
  topic: string;
  start_time: Date | string;
  duration: number;
};

export type JoinToken = {
  role: number;
  meeting_number: number;
};

@Injectable()
export class ZoomService {
  constructor(
    private httpService: HttpService,
    private util: UtilsService,
    private cache: CacheService,
  ) {}

  async getAccessToken() {
    const key = 'zoomAccessToken';
    if (await this.cache.getCache(key)) {
      return await this.cache.getCache(key);
    }

    const secret_buff = Buffer.from(
      `${zoomConfig().ZOOM_CLIENT_ID}:${zoomConfig().ZOOM_CLIENT_SECRET}`,
    );
    const secret_encode = secret_buff.toString('base64');
    const post_url = `${zoomConfig().ZOOM_OAUTH_ENDPOINT}?grant_type=account_credentials&account_id=${zoomConfig().ZOOM_ACCOUNT_ID}`;
    this.util.logger(ZoomService.name).log('Zoom Post URL', post_url);
    const req = await this.httpService.axiosRef.post(
      post_url,
      {},
      {
        headers: {
          Authorization: `Basic ${secret_encode}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    this.util.logger(ZoomService.name).log(req.data);
    if (req.data) {
      if (req.data.access_token) {
        await this.cache.setCache(key, req.data, req.data.expires_in);
      }
      return req.data;
    }

    return null;
  }

  async createMeeting(param: MeetingParam) {
    const { access_token } = await this.getAccessToken();

    const user = 'rizdar.contact@gmail.com';
    const dataMeeting = {
      topic: param.topic,
      type: 2,
      start_time: param.start_time,
      duration: param.duration,
      timezone: 'Asia/Jakarta',
      password: '1234567890',
      // default_password: true,
      schedule_for: user,
      settings: {
        host_video: true,
        participant_video: true,
        in_meeting: true,
        join_before_host: true,
        jbh_time: 0,
        mute_upon_entry: true,
        watermark: true,
        user_pmi: false,
        approval_type: 2,
        audio: 'both',
        auto_recording: 'cloud',
      },
    };
    const req = await this.httpService.axiosRef.post(
      `${zoomConfig().ZOOM_API_BASE_URL}/users/${user}/meetings`,
      dataMeeting,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
    if (req) {
      return req.data;
    }
    return null;
  }

  generateTokenJoin(param: JoinToken) {
    const iat = Math.round(new Date().getTime() / 1000) - 30;
    const exp = iat + 60 * 60 * 3;

    const oHeader = { alg: 'HS256', typ: 'JWT' };

    const oPayload = {
      sdkKey: zoomConfig().ZOOM_MEETING_SDK_KEY,
      mn: param.meeting_number,
      role: param.role,
      iat: iat,
      exp: exp,
      appKey: zoomConfig().ZOOM_MEETING_SDK_KEY,
      tokenExp: iat + 60 * 60 * 2,
    };

    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);
    const signature = KJUR.jws.JWS.sign(
      'HS256',
      sHeader,
      sPayload,
      zoomConfig().ZOOM_MEETING_SDK_SECRET,
    );
    return signature;
  }
}
