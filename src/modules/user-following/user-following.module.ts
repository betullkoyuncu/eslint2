import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserFollowingModel } from './user-following.model';
import { UserFollowingService } from './user-following.service';
import { UserFollowingController } from './user-following.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
    UserFollowingService,
    {
      provide: UserFollowingModel.name,
      useValue: UserFollowingModel,
    },
  ],
  exports: [UserFollowingService],
  controllers: [UserFollowingController],
})
export class UserFollowingModule {}
