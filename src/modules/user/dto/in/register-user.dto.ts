import { IsEmail, IsString, Length, MaxLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class RegisterUserDTO {
  @MaxLength(255, {
    message: i18nValidationMessage('validation.maxLength', { val: 255 }),
  })
  @IsEmail({}, { message: 'validation.invalidEmail' })
  email: string;

  @Length(8, 16, {})
  @IsString()
  password: string;
}
