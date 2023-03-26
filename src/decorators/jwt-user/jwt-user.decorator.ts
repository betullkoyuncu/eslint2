import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

// export const JwtUser = (...args: string[]) => SetMetadata('jwt-user', args);

export const JwtUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  return request.user;
});
