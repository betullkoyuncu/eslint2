import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtUser } from 'src/decorators/jwt-user/jwt-user.decorator';
import { LocalAuthGuard } from 'src/guards/local-auth.guards';
import { OptionalJwtAuthGuard } from 'src/guards/optional-jwt-auth.guard';
import { JwtPayload } from 'src/shared/interfaces';
import { AuthService } from './auth.service';

@Controller('api/auth/v1')
export class AuthControllerV1 {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@JwtUser() jwtUser: JwtPayload) {
    return {
      user: jwtUser,
      token: this.authService.signJwt(jwtUser),
    };
  }

  @Get()
  @UseGuards(OptionalJwtAuthGuard)
  async test(@JwtUser() jwtUser: JwtPayload) {
    return jwtUser;
  }
}
