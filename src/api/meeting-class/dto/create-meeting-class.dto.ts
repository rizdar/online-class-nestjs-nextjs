import { $Enums, Prisma } from '@prisma/client';
import { IsString } from 'class-validator';

export class CreateMeetingClassDto implements Prisma.meeting_classCreateInput {
  @IsString()
  class_name?: string;

  @IsString()
  class_description?: string;

  mentor_id?: string;

  image?: string;

  image_id?: string;

  image_path?: string;

  start_time: string | Date;

  end_time: string | Date;

  created_by_id: string;
}
