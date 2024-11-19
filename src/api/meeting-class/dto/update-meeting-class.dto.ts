import { PartialType } from '@nestjs/mapped-types';
import { CreateMeetingClassDto } from './create-meeting-class.dto';

export class UpdateMeetingClassDto extends PartialType(CreateMeetingClassDto) {}
