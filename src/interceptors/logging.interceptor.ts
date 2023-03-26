import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WinstonLogger, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Observable, tap } from 'rxjs';
import { v4 } from 'uuid';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: WinstonLogger,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const id = v4();
    this.logger.log({
      message: {
        type: 'request',
        ip: request.ip,
        requestId: id,
        path: request.route.path,
        method: request.route.method,
        query: request.query,
        params: request.params,
        body: request.body,
      },
    });
    return next.handle().pipe(
      tap((info) => {
        this.logger.log({
          message: {
            type: 'response',
            ip: request.ip,
            requestId: id,
            path: response.req.url,
            method: response.req.method,
            statusCode: response.statusCode,
            response: info,
          },
        });
      }),
    );
  }
}
