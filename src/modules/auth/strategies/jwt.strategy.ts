import {
  UnauthorizedException,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { JwtPayload } from 'src/shared/interfaces';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.findOneByEmail(payload.email);
    if (!user) {
      throw new ForbiddenException(JwtStrategy.name, {
        cause: new Error('user not found'),
      });
    } else if (
      new Date(user.passwordChangedAt).getTime() >
      payload.iat * 1_000
    ) {
      throw new UnauthorizedException(JwtStrategy.name, {
        cause: new Error('password changed'),
      });
    } else if (new Date().getTime() > payload.exp * 1_000) {
      throw new UnauthorizedException(JwtStrategy.name, {
        cause: new Error('token expired'),
      });
    }
    return payload;
  }
}
