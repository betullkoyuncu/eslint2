import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (user && user.validatePassword(password)) return user.toAuthJSON();
    return null;
  }

  async findOneByEmail(email: string) {
    const user = await this.userService.findOneByEmail(email);
    return user;
  }

  signJwt(user: ReturnType<User['toAuthJSON']>) {
    const payload = { ...user };
    return this.jwtService.sign(payload);
  }
}
