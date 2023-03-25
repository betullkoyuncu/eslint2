import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserModel } from './user.model';

@Module({
  providers: [
    UserService,
    {
      provide: UserModel.name,
      useValue: UserModel,
    },
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
