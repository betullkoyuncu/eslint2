import { HttpException, UnprocessableEntityException } from '@nestjs/common';
import { ValidationError } from 'sequelize';

export class SequelizeValidationException extends UnprocessableEntityException {
  constructor(message: string, public readonly error: ValidationError) {
    super(message);
  }
}
