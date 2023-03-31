import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class UserLoginDTO {
  @ApiProperty({
    type: String,
    description: 'email',
    required: true,
  })
  @IsEmail(
    {},
    {
      message: 'validator.isEmail',
    },
  )
  email: string;

  @ApiProperty({
    type: String,
    description: 'password',
    required: true,
  })
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
}
