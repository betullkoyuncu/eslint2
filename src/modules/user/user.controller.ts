import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtUser } from 'src/decorators/jwt-user/jwt-user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { OptionalJwtAuthGuard } from 'src/guards/optional-jwt-auth.guard';
import { JwtPayload } from 'src/shared/interfaces';
import { UserRegisterDTO } from './dto/in/user-register.dto';
import { UserUpdateDTO } from './dto/in/user-update.dto';
import { UserService } from './user.service';

@Controller('api/user/v1')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() userRegisterDTO: UserRegisterDTO) {
    return this.userService.register(userRegisterDTO);
  }

  @HttpCode(HttpStatus.OK)
  @Put('update')
  async update(
    @JwtUser() jwtUser: JwtPayload,
    @Body() userUpdateDTO: UserUpdateDTO,
  ) {
    return this.userService.update(jwtUser, userUpdateDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get('follow/:id')
  async followUser(
    @Param('id') userId: string,
    @JwtUser() jwtUser: JwtPayload,
  ) {
    return this.userService.followUser(Number(userId), jwtUser.id);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get(':id')
  async findUserDetails(
    @Param('id') userId: string,
    @JwtUser() jwtUser?: JwtPayload,
  ) {
    return this.userService.findUserDetails(Number(userId), jwtUser.id);
  }
}
