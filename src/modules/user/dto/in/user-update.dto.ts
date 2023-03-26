import { IsByteLength, IsOptional, IsString, Length } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class UserUpdateDTO {
  @IsOptional()
  @IsString({ message: 'validator.isString' })
  nickname?: string;

  @IsOptional()
  @Length(0, 255, {
    message: i18nValidationMessage('validator.length', { min: 0, max: 255 }),
  })
  @IsString({ message: 'validator.isString' })
  icon?: string;

  @IsOptional()
  @Length(0, 255, {
    message: i18nValidationMessage('validator.length', { min: 0, max: 255 }),
  })
  @IsString({ message: 'validator.isString' })
  backgroundImage?: string;

  @IsOptional()
  @IsByteLength(0, 200, {
    message: i18nValidationMessage('validator.byteSize', { max: 200 }),
  })
  @IsString({ message: 'validator.isString' })
  profile?: string;
}
