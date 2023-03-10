import { Module } from '@nestjs/common';
import { I18nModule } from 'nestjs-i18n';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import * as path from 'path';
import { HeaderResolver } from 'nestjs-i18n/dist/resolvers/header.resolver';

@Module({
  imports: [
    DatabaseModule,
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
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
