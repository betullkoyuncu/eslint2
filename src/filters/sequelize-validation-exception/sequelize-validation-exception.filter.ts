import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { SequelizeValidationException } from 'src/exceptions/sequelize-validation/sequelize-validation.exception';
import { WinstonLogger, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Catch(SequelizeValidationException)
export class SequelizeValidationExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: WinstonLogger,
  ) {}

  catch(exception: SequelizeValidationException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    const errors = exception.error.errors;

    console.log(errors);

    const errorObject = errors.reduce<Record<string, string[]>>((obj, item) => {
      if (!obj[item.path]) obj[item.path] = [];
      obj[item.path].push(item.type);
      return obj;
    }, {});

    this.logger.error({
      message: {
        type: SequelizeValidationExceptionFilter.name,
        error: errorObject,
      },
    });

    return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json(errorObject);
  }
}
