import { ArgumentsHost, Catch, ExceptionFilter, Inject } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { Request, Response } from 'express';
import { I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from 'src/i18n/i18n.typed';
import { WinstonLogger, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { getRequestInfo } from 'src/middlewares/logger/logger.middleware';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: WinstonLogger,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest<Request>();
    const response = host.switchToHttp().getResponse<Response>();
    const i18n = I18nContext.current<I18nTranslations>(host);

    this.logger.error({
      message: {
        status: exception.getStatus(),
        ...getRequestInfo(request),
      },
    });

    return response.status(exception.getStatus()).send(exception.getResponse());
  }
}
