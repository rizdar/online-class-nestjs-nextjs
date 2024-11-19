import { Module } from '@nestjs/common';
import { MeetingClassService } from './meeting-class.service';
import { MeetingClassController } from './meeting-class.controller';
import { ZoomModule } from 'src/libs/zoom/zoom.module';

@Module({
  imports: [ZoomModule],
  controllers: [MeetingClassController],
  providers: [MeetingClassService],
})
export class MeetingClassModule {}
