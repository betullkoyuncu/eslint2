import {
  ConflictException,
  Inject,
  Injectable,
  NotImplementedException,
} from '@nestjs/common';
import { SequelizeValidationException } from 'src/exceptions/sequelize-validation/sequelize-validation.exception';
import { UserFollowingModel } from './user-following.model';

@Injectable()
export class UserFollowingService {
  constructor(
    @Inject(UserFollowingModel.name)
    private readonly followingRepo: typeof UserFollowingModel,
  ) {}

  async following(userId: number, followingId: number) {
    try {
      const following = await this.findCurrentRelationship(userId, followingId);
      if (following) {
        throw new ConflictException();
      }
      const saved = await this.followingRepo.create({
        userId,
        followingId,
      });
      return saved;
    } catch (error) {
      throw new SequelizeValidationException(UserFollowingService.name, error);
    }
  }

  async unfollow(userId: number, followingId: number) {
    try {
      const following = await this.findCurrentRelationship(userId, followingId);
      if (!following) {
        throw new NotImplementedException();
      }
      const destoried = await this.followingRepo.destroy({
        where: { userId, followingId },
      });
      return destoried;
    } catch (error) {
      throw new SequelizeValidationException(UserFollowingService.name, error);
    }
  }

  async findCurrentRelationship(userId: number, followingId: number) {
    try {
      const following = this.followingRepo.findOne({
        where: { userId, followingId },
      });
      return following;
    } catch (error) {
      throw new SequelizeValidationException(UserFollowingService.name, error);
    }
  }
}
