import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MeetingClassModule } from './meeting-class/meeting-class.module';

@Module({
  imports: [AuthModule, UserModule, MeetingClassModule]
})
export class ApiModule {}
