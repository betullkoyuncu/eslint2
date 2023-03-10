import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { I18nValidationPipe } from 'nestjs-i18n';
import { I18nValidationExceptionFilter } from './filters/i18n-validation-exception/i18n-validation-exception.filter';
import { SequelizeValidationExceptionFilter } from './filters/sequelize-validation-exception/sequelize-validation-exception.filter';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter';
import { Logger } from 'winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const loggerService = app.get<Logger>(WINSTON_MODULE_NEST_PROVIDER);

  app.useGlobalPipes(
    new I18nValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalFilters(new I18nValidationExceptionFilter(loggerService));
  app.useGlobalFilters(new SequelizeValidationExceptionFilter(loggerService));

  app.useGlobalFilters(new HttpExceptionFilter(loggerService));

  await app.listen(5000);
}
bootstrap();
