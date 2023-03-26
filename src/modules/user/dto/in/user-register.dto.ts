import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class UserRegisterDTO {
  @IsEmail(
    {},
    {
      message: 'validator.isEmail',
    },
  )
  email: string;

  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message: 'validator.passwordFormat',
  })
  @Length(8, 24, {
    message: i18nValidationMessage('validator.length', { min: 8, max: 24 }),
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
