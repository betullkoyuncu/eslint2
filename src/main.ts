import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { I18nValidationPipe } from 'nestjs-i18n';
import { SequelizeValidationExceptionFilter } from './filters/sequelize-validation-exception/sequelize-validation-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { WinstonLogger, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { I18nValidationExceptionFilter } from 'src/filters/i18n-validation-exception/i18n-validation-exception.filter';
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const winstonLogger = app.get<WinstonLogger>(WINSTON_MODULE_NEST_PROVIDER);

  app.useGlobalInterceptors(new LoggingInterceptor(winstonLogger));

  app.useGlobalPipes(
    new I18nValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter(winstonLogger));
  app.useGlobalFilters(new I18nValidationExceptionFilter(winstonLogger));
  app.useGlobalFilters(new SequelizeValidationExceptionFilter(winstonLogger));

  const config = new DocumentBuilder()
    .setTitle('Tweeter')
    .setDescription('This is Tweeter API Description')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}
bootstrap();
