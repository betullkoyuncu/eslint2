import { Body, Controller, Post } from '@nestjs/common';
import { UserRegisterDTO } from './dto/in/user-register.dto';
import { UserService } from './user.service';

@Controller('api/user/v1')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() userRegisterDTO: UserRegisterDTO) {
    return this.userService.register(userRegisterDTO);
  }
}
