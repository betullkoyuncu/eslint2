import { Module } from '@nestjs/common';
import { UserFollowingModel } from './user-following.model';
import { UserFollowingService } from './user-following.service';

@Module({
  providers: [
    UserFollowingService,
    {
      provide: UserFollowingModel.name,
      useValue: UserFollowingModel,
    },
  ],
  exports: [UserFollowingService],
})
export class UserFollowingModule {}
