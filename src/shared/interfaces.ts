import { UserModel } from 'src/modules/user/user.model';

export type JwtPayload = ReturnType<UserModel['toAuthJson']> & {
  // in seconds
  iat: number;

  // in seconds
  exp: number;
};

export interface Pagination {
  limit?: number;
  offset?: number;
}
