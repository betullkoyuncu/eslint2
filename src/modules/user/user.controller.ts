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
import {
  ApiBearerAuth,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('user')
@Controller('api/user/v1')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: 200, description: 'user register success' })
  @ApiResponse({ status: 400, description: 'bad request, invalid parameters' })
  @ApiResponse({ status: 500, description: 'internal server error' })
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() userRegisterDTO: UserRegisterDTO) {
    return this.userService.register(userRegisterDTO);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Put('update')
  async update(
    @JwtUser() jwtUser: JwtPayload,
    @Body() userUpdateDTO: UserUpdateDTO,
  ) {
    return this.userService.update(jwtUser, userUpdateDTO);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('follow/:id')
  async followUser(
    @Param('id') userId: string,
    @JwtUser() jwtUser: JwtPayload,
  ) {
    return this.userService.followUser(Number(userId), jwtUser.id);
  }

  @ApiBearerAuth()
  @UseGuards(OptionalJwtAuthGuard)
  @Get(':id')
  async findUserDetails(
    @Param('id') userId: string,
    @JwtUser() jwtUser?: JwtPayload,
  ) {
    return this.userService.findUserDetails(Number(userId), jwtUser.id);
  }
}
