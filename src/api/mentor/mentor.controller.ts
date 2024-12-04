import { Controller, UseGuards, Get } from '@nestjs/common';
import { UtilsService } from 'src/utils/utils.service';
import { MentorService } from './mentor.service';
import { JwtAuthGuard } from 'src/libs/jwt-auth/jwt-auth.guard';

@Controller('mentor')
export class MentorController {
  constructor(private readonly mentorService: MentorService, private readonly util : UtilsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getMentors() {
    const mentors = await this.mentorService.getMentors();
    return await this.util.response.json({
      data: mentors,
      message: "get mentor success"
    })
  }
}
