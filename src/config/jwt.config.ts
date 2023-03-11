import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  secret: 'A9e4fwHVq3B3k7Yk2ZiX',
  signOptions: {
    expiresIn: '14d',
    issuer: 'tweeter',
    algorithm: 'HS256',
  },
};
