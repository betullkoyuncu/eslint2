import { ArgumentsHost, Catch, ExceptionFilter, Inject } from '@nestjs/common';
import { Response } from 'express';
import { I18nValidationException, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from 'src/i18n/i18n.typed';
import { WinstonLogger, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Catch(I18nValidationException)
export class I18nValidationExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: WinstonLogger,
  ) {}

  catch(exception: I18nValidationException, host: ArgumentsHost) {
    const i18n = I18nContext.current<I18nTranslations>();
    const errorObject = exception.errors.reduce((obj, error) => {
      obj[error.property] = Object.values(error.constraints).map((str: any) => {
        const [key, argsStr] = str.split('|');
        const args = !!argsStr ? JSON.parse(argsStr) : {};
        return i18n.translate(key, {
          lang: i18n.lang,
          args: { ...args, property: error.property },
        });
      });
      return obj;
    }, {});
    this.logger.error({
      message: {
        type: I18nValidationExceptionFilter.name,
        error: errorObject,
      },
    });
    const response = host.switchToHttp().getResponse<Response>();
    response.status(exception.getStatus()).json(errorObject);
  }
}
