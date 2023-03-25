import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class UserRegisterDTO {
  @IsEmail(
    {},
    {
      message: 'validator.isEmail',
    },
  )
  email: string;

  @Length(8, 24, {
    message: i18nValidationMessage('validator.length', {
      min: 8,
      max: 24,
    }),
  })
  @IsString({
    message: 'validator.isString',
  })
  password: string;

  @IsOptional()
  @IsString({
    message: 'validator.isString',
  })
  nickname?: string;

  //   @ValidateNested()
  //   @IsDefined()
  //   @Type(() => DTOType)
  //   extra: ExtraDTO
}
