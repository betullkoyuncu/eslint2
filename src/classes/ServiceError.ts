import { TranslateOptions } from 'nestjs-i18n';
import { I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from 'src/i18n/i18n.typed';

interface ServiceErrorI18nOption {
  key: any;
  args?: TranslateOptions['args'];
}

export class ServiceError extends Error {
  i18nOption?: ServiceErrorI18nOption;

  constructor(
    public readonly message: string,
    i18nOption: ServiceErrorI18nOption,
  ) {
    super(message);
    this.i18nOption = i18nOption;
  }

  getI18nMessage() {
    if (!this.i18nOption) return this.message;
    const i18n = I18nContext.current<I18nTranslations>();
    return i18n.translate(this.i18nOption.key, {
      args: this.i18nOption.args,
    });
  }
}
