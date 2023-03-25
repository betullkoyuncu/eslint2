import { HeaderResolver, type I18nOptions } from 'nestjs-i18n';
import * as path from 'path';

export const i18nOptions: I18nOptions = {
  fallbackLanguage: 'en_US',
  fallbacks: {
    'en-*': 'en_US',
    'en_*': 'en_US',
    'zh*': 'zh_HK',
  },
  loaderOptions: {
    path: path.join(__dirname, '../i18n/'),
    watch: true,
  },
  resolvers: [
    {
      use: HeaderResolver,
      options: ['x-locales'],
    },
  ],
  typesOutputPath: path.join(__dirname, '../../src/i18n/i18n.typed.ts'),
};
