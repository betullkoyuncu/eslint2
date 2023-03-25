import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/modules/user/user.model';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (user && user.validatePassword(password)) return user.toAuthJson();
    return null;
  }

  async findOneByEmail(email: string) {
    const user = await this.userService.findOneByEmail(email);
    return user;
  }

  signJwt(user: ReturnType<UserModel['toAuthJson']>) {
    const payload = { ...user };
    return this.jwtService.sign(payload);
  }
}
