import * as winston from 'winston';
import 'winston-daily-rotate-file';

const sensitiveKeys = ['password'];

const replaceSensitiveData = (data: any) => {
  if (Array.isArray(data)) {
    return data.map(replaceSensitiveData);
  } else if (!data) {
    return data;
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

export const winstonTransports: winston.LoggerOptions['transports'] = [
  new winston.transports.DailyRotateFile({
    dirname: 'logs',
    filename: '%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.json({
        replacer(key, value) {
          if (sensitiveKeys.includes(key)) {
            return '******';
          }
          return value;
        },
      }),
      winston.format.printf((info) => {
        const res = { ...info };
        return JSON.stringify({
          level: res.level,
          timestamp: res.timestamp,
          message: replaceSensitiveData(res.message),
        });
      }),
    ),
  }),
];
