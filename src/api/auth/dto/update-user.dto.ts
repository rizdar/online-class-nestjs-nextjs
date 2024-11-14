import { Prisma } from '@prisma/client';
import { IsEmail, IsString, Min, ValidateIf } from 'class-validator';

export class UpdateUserDto implements Prisma.usersCreateInput {
  @IsString()
  @ValidateIf((object, value) => value !== undefined && value !== null)
  name: string;

  @IsEmail()
  @ValidateIf((object, value) => value !== undefined && value !== null)
  email: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined && value !== null)
  phone?: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined && value !== null)
  @Min(6)
  password: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined && value !== null)
  avatar?: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined && value !== null)
  avatar_path?: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined && value !== null)
  avatar_media_id?: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined && value !== null)
  profession?: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined && value !== null)
  about?: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined && value !== null)
  medsos_instagram?: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined && value !== null)
  medsos_facebook?: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined && value !== null)
  medsos_linkedin?: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined && value !== null)
  medsos_wa?: string;
}
