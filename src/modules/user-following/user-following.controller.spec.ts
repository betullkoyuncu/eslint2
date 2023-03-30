import { Test, TestingModule } from '@nestjs/testing';
import { UserFollowingController } from './user-following.controller';

describe('UserFollowingController', () => {
  let controller: UserFollowingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserFollowingController],
    }).compile();

    controller = module.get<UserFollowingController>(UserFollowingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
