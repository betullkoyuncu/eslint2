import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtUser } from 'src/decorators/jwt-user/jwt-user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { JwtPayload } from 'src/shared/interfaces';
import { RegisterUserDTO } from './dto/in/register-user.dto';
import { UserService } from './user.service';

@Controller('api/user/v1')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerUserDTO: RegisterUserDTO) {
    return this.userService.register(registerUserDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  async privateGet(@JwtUser() jwtUser: JwtPayload) {
    return jwtUser;
  }
}
