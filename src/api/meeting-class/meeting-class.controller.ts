import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MeetingClassService } from './meeting-class.service';
import { CreateMeetingClassDto } from './dto/create-meeting-class.dto';
import { UpdateMeetingClassDto } from './dto/update-meeting-class.dto';
import { JwtAuthGuard } from 'src/libs/jwt-auth/jwt-auth.guard';
import { UtilsService } from 'src/utils/utils.service';
import { AddUserDto } from './dto/add-user.dto';

@Controller('meeting-class')
export class MeetingClassController {
  constructor(
    private readonly meetingClassService: MeetingClassService,
    private util: UtilsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createMeetingClassDto: CreateMeetingClassDto,
    @Req() req,
  ) {
    createMeetingClassDto.created_by_id = req.user.user_id;
    return this.util.response.json({
      data: await this.meetingClassService.create(createMeetingClassDto),
      message: 'Create meeting success',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.util.response.json({
      data: await this.meetingClassService.findAll(),
      message: 'get all meeting success',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('detail/:id')
  async findOne(@Param('id') id: string) {
    return this.util.response.json({
      data: await this.meetingClassService.findOne(id),
      message: 'get meeting success',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMeetingClassDto: UpdateMeetingClassDto,
  ) {
    return this.util.response.json({
      data: await this.meetingClassService.update(id, updateMeetingClassDto),
      message: 'update meeting success',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.util.response.json({
      data: await this.meetingClassService.remove(id),
      message: 'delete meeting success',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('add-user')
  async addUser(@Body() data: AddUserDto) {
    return this.util.response.json({
      data: await this.meetingClassService.addUser(data),
      message: 'add user success',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove-user/:user_id/:class_id')
  async removeUser(@Param('user_id') user_id, @Param('class_id') class_id) {
    return this.util.response.json({
      data: await this.meetingClassService.removeUser({
        user_id: user_id,
        class_id: class_id,
      }),
      message: 'remove user success',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('publish/:meeting_id')
  async publish(@Param('meeting_id') meeting_id: string) {
    return this.util.response.json({
      data: await this.meetingClassService.publish(meeting_id),
      message: 'Publish meeting class success',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('class-by-user')
  async findClassByUserAssign(@Req() req) {
    const user_id = req.user.user_id;
    const user_type = req.user.user_type;
    return this.util.response.json({
      data: await this.meetingClassService.findClassByUserAssign(user_id, user_type),
      message: "get all meeting success"
    });
  }


  @UseGuards(JwtAuthGuard)
  @Post('join-meeting/:class_id')
  async joinMeeting(@Req() req, @Param('class_id') class_id) {
    const user_id = req.user.user_id;
    return this.util.response.json({
      data: await this.meetingClassService.joinMeeting(class_id, user_id),
      message: "Join meeting success"
    });
  }


  @UseGuards(JwtAuthGuard)
  @Get('check-join-meeting/:meeting_id')
  async checkJoinMeetingClass(@Req() req, @Param('meeting_id') meeting_id) {
    const user_id = req.user.user_id;
    const user_type = req.user.user_type;
    return this.util.response.json({
      data: await this.meetingClassService.checkJoinMeetingClass(meeting_id, user_id, user_type),
      message: "Check join meeting success"
    });
  }


  @UseGuards(JwtAuthGuard)
  @Get('generate-join-token/:meeting_number/:role')
  async generateJoinToken(@Param('meeting_number') meeting_number, @Param('role') role) {
    const joinToken = await this.meetingClassService.generateJoinToken(+meeting_number, +role);
    return await this.util.response.json({
      data: {
        join_token: joinToken
      },
      message: "Generate join token success"
    })
  }
}
