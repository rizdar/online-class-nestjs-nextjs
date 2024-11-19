import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateMeetingClassDto } from './dto/create-meeting-class.dto';
import { UpdateMeetingClassDto } from './dto/update-meeting-class.dto';
import { RepositoriesService } from 'src/repositories/repositories.service';
import { AddUserDto } from './dto/add-user.dto';
import { UtilsService } from 'src/utils/utils.service';
import { ZoomService } from 'src/libs/zoom/zoom.service';
import { class_status } from '@prisma/client';

@Injectable()
export class MeetingClassService {
  constructor(
    private repo: RepositoriesService,
    private util: UtilsService,
    private zoom: ZoomService,
  ) {}

  async create(createMeetingClassDto: CreateMeetingClassDto) {
    const createMeeting = await this.repo.meetingClass.create(
      createMeetingClassDto,
    );
    if (createMeeting) {
      return {
        success: true,
      };
    }
    throw new InternalServerErrorException('Create meeting error');
  }

  async findAll() {
    return await this.repo.meetingClass.findAll();
  }

  async findOne(id: string) {
    return await this.repo.meetingClass.findByID(id);
  }

  async update(id: string, updateMeetingClassDto: UpdateMeetingClassDto) {
    return await this.repo.meetingClass.update(id, updateMeetingClassDto);
  }

  async remove(id: string) {
    return await this.repo.meetingClass.update(id, { is_deleted: true });
  }

  async addUser(data: AddUserDto) {
    return await this.repo.meetingClass.addUser(data.class_id, data.user_id);
  }

  async removeUser(data: AddUserDto) {
    return await this.repo.meetingClass.removeUser(data.class_id, data.user_id);
  }

  async publish(meeting_id: string) {
    const meeting = await this.repo.meetingClass.findByID(meeting_id);
    if (meeting) {
      const st = meeting.start_time.getTime();
      const end = meeting.end_time.getTime();
      const durationInMinute = (end - st) / 60000;

      if (durationInMinute >= 40) {
        throw new BadRequestException(
          `Durasi tidak boleh lebih 40 menit, durasi ${durationInMinute} menit`,
        );
      }

      const createMeetingApi = await this.zoom.createMeeting({
        topic: meeting.class_name,
        start_time: meeting.start_time,
        duration: durationInMinute,
      });
      this.util
        .logger(MeetingClassService.name)
        .warn('meeting', createMeetingApi);
      if (createMeetingApi) {
        await this.repo.zoom.create({
          data: {
            class_id: meeting.id,
            topic_name: meeting.class_name,
            duration: durationInMinute,
            schedule_at: meeting.start_time,
            meeting_number: String(createMeetingApi.id),
            credentials: createMeetingApi,
          },
        });
        const updateStatus = await this.repo.meetingClass.update(meeting_id, {
          class_status: class_status.published,
        });
        if (updateStatus) {
          return {
            success: true,
          };
        }
      } else {
        throw new InternalServerErrorException('Publish meeting error');
      }
    }
  }
}
