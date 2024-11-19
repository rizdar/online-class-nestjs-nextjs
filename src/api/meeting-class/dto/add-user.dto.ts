import { IsString } from 'class-validator';

export class AddUserDto {
  @IsString()
  user_id: string;

  @IsString()
  class_id: string;
}
