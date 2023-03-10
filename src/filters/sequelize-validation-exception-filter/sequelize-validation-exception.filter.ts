import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { SequelizeValidationException } from 'src/exceptions/sequelize-validation-exception/sequelize-validation-exception';

@Catch(SequelizeValidationException)
export class SequelizeValidationExceptionFilter<T> implements ExceptionFilter {
  catch(exception: SequelizeValidationException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    const errors = exception.error.errors;

    const errorObject = errors.reduce<Record<string, string[]>>((obj, item) => {
      if (!obj[item.path]) obj[item.path] = [];
      obj[item.path].push(item.type);
      return obj;
    }, {});

    return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json(errorObject);
  }
}
