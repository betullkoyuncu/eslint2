import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { I18nValidationPipe } from 'nestjs-i18n';
import { I18nValidationExceptionFilter } from './filters/i18n-validation-exception/i18n-validation-exception.filter';
import { SequelizeValidationExceptionFilter } from './filters/sequelize-validation-exception-filter/sequelize-validation-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new I18nValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalFilters(new I18nValidationExceptionFilter());
  app.useGlobalFilters(new SequelizeValidationExceptionFilter());
  await app.listen(5000);
}
bootstrap();
