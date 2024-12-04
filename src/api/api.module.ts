import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MeetingClassModule } from './meeting-class/meeting-class.module';
import { MentorModule } from './mentor/mentor.module';

@Module({
  imports: [AuthModule, UserModule, MeetingClassModule, MentorModule]
})
export class ApiModule {}
