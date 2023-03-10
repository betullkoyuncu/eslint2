import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterUserDTO } from './dto/in/register-user.dto';
import { UserService } from './user.service';

@Controller('api/user/v1')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerUserDTO: RegisterUserDTO) {
    return this.userService.register(registerUserDTO);
  }

  @Get('/test')
  test() {
    return 'hello';
  }
}
