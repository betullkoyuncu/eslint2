import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtUser } from 'src/decorators/jwt-user/jwt-user.decorator';
import { LocalAuthGuard } from 'src/guards/local-auth.guards';
import { JwtPayload } from 'src/shared/interfaces';
import { AuthService } from './auth.service';

@Controller('api/auth/v1')
export class AuthControllerV1 {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@JwtUser() jwtUser: JwtPayload) {
    return {
      user: jwtUser,
      token: this.authService.signJwt(jwtUser),
    };
  }
}
