import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RepositoriesService } from './repositories/repositories.service';
import { CacheService } from './libs/cache/cache.service';
import { ZoomService } from './libs/zoom/zoom.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private repo: RepositoriesService,
    private cache: CacheService,
    private zoom: ZoomService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  async testGetUser() {
    return this.repo.user.findAllUsers();
  }

  @Get('test-cache')
  async getCache() {
    const cacheBiodata = await this.cache.getCache('biodata');
    if (cacheBiodata) {
      return cacheBiodata;
    }
    await this.cache.setCache('biodata', {
      name: 'Rizki',
      email: 'rizdar.contact@gmail.com',
    });
  }
  @Get('test-access-token')
  async getAccessTokenZoom() {
    return await this.zoom.getAccessToken();
  }

  @Post('test-create-meeting')
  async testCreateZoomApi(@Body() data: any) {
    const createMeeting = await this.zoom.createMeeting({
      topic: data.topic,
      start_time: data.start_time,
      duration: 30,
    });
    console.log(createMeeting);

    return {
      success: true,
    };
  }

  @Get('join-token')
  async getJoinToken() {
    return {
      joinToken: await this.zoom.generateTokenJoin({
        role: 0,
        meeting_number: 12435464,
      }),
    };
  }
}
