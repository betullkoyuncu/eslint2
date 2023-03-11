import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  profile?: string;

  @IsString()
  @IsOptional()
  backgroundPic?: string;

  @IsString()
  @IsOptional()
  icon?: string;
}
