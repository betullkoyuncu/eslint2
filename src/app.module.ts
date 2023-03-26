import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { I18nModule } from 'nestjs-i18n';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { WinstonModule } from 'nest-winston';
// import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { MediaModule } from './modules/media/media.module';
import { MulterModule } from '@nestjs/platform-express';
import { winstonTransports } from './config/winston.config';
import { i18nOptions } from './config/i18n.config';
import { multerOptions } from './config/multer.config';
import { UserModule } from './modules/user/user.module';
// import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Module({
  imports: [
    DatabaseModule,
    WinstonModule.forRoot({
      transports: winstonTransports,
    }),
    I18nModule.forRoot(i18nOptions),
    MulterModule.register(multerOptions),
    AuthModule,
    MediaModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LoggerMiddleware).forRoutes({
//       path: '*',
//       method: RequestMethod.ALL,
//     });
//   }
// }
