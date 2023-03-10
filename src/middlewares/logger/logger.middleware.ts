import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    // this.logger.log('route', {
    //   req: getRequestInfo(req),
    // });

    next();
  }
}

export const getRequestInfo = (req: Request) => {
  const { query, headers, url, method, body } = req;

  const xRealIp = headers['X-Real-IP'];
  const xForwardedFor = headers['X-Forwarded-For'];
  const { ip: cIp } = req;
  const ip = xRealIp || xForwardedFor || cIp;

  return {
    url,
    host: headers.host,
    ip,
    method,
    query,
    body,
  };
};
