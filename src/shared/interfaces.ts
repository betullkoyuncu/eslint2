import { User } from 'src/modules/user/user.entity';

export type JwtPayload = ReturnType<User['toAuthJSON']> & {
  // in seconds
  iat: number;

  // in seconds
  exp: number;
};
