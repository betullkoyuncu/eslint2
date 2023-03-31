import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserFollowingService } from './user-following.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('following')
@Controller('api/following/v1')
export class UserFollowingController {
  constructor(private readonly userFollowingService: UserFollowingService) {}
}
