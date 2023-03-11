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
import { UserModule } from './modules/user/user.module';
import * as path from 'path';
import { HeaderResolver } from 'nestjs-i18n/dist/resolvers/header.resolver';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { ArticleModule } from './modules/article/article.module';
import { MediaModule } from './modules/media/media.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

const sensitiveKeys = ['password'];

const replaceSensitiveData = (data: any) => {
  if (Array.isArray(data)) {
    return data.map(replaceSensitiveData);
  } else if (typeof data === 'object') {
    return Object.entries(data).reduce((obj, [key, val]) => {
      if (!['string', 'number'].includes(typeof val))
        obj[key] = replaceSensitiveData(val);
      else if (sensitiveKeys.includes(key)) obj[key] = '******';
      else obj[key] = val;
      return obj;
    }, {});
  }
  return data;
};

@Module({
  imports: [
    DatabaseModule,
    WinstonModule.forRoot({
      transports: [
        new winston.transports.DailyRotateFile({
          dirname: 'logs',
          filename: '%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.json(),
            winston.format.printf((info) => {
              const res = { ...info };
              res.stack = replaceSensitiveData(res.stack);
              return JSON.stringify(res);
            }),
          ),
        }),
      ],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en_US',
      fallbacks: {
        'en-*': 'en_US',
        'en_*': 'en_US',
        'zh*': 'zh_HK',
      },
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        {
          use: HeaderResolver,
          options: ['x-locales'],
        },
      ],
      typesOutputPath: path.join(__dirname, '../src/i18n/i18n.typed.ts'),
    }),
    MulterModule.register({
      dest: path.join(__dirname, '../uploads'),
      // storage: diskStorage({
      //   destination: path.join(__dirname, '../uploads'),
      // }),
    }),
    UserModule,
    AuthModule,
    ArticleModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
