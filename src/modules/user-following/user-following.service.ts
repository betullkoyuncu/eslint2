import {
  ConflictException,
  Inject,
  Injectable,
  NotImplementedException,
} from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { SequelizeValidationException } from 'src/exceptions/sequelize-validation/sequelize-validation.exception';
import { Pagination } from 'src/shared/interfaces';
import { UserFollowingModel } from './user-following.model';

@Injectable()
export class UserFollowingService {
  constructor(
    @Inject(Sequelize.name)
    private readonly conn: Sequelize,
    @Inject(UserFollowingModel.name)
    private readonly followingRepo: typeof UserFollowingModel,
  ) {}

  async listFollowings(userId: number, pagination?: Pagination) {
    const { limit = 20, offset = 0 } = pagination;
    try {
      const followings = await this.followingRepo.findAndCountAll({
        where: { userId },
        limit,
        offset,
      });
      return followings;
    } catch (error) {
      throw new SequelizeValidationException(UserFollowingService.name, error);
    }
  }

  async listFollowers(userId: number, pagination?: Pagination) {
    const { limit = 20, offset = 0 } = pagination;
    try {
      const followers = await this.followingRepo.findAndCountAll({
        where: { followingId: userId },
        limit,
        offset,
      });
      return followers;
    } catch (error) {
      throw new SequelizeValidationException(UserFollowingService.name, error);
    }
  }

  async getCount(userId: number) {
    try {
      const [results] = await this.conn.query(
        `SELECT 
        (
          SELECT COUNT(*) FROM user_followings where userId = ${userId}
        ) as followings,
        (
          SELECT COUNT(*) FROM user_followings where followingId = ${userId}
        ) as followers
        `,
        {
          type: QueryTypes.SELECT,
        },
      );
      return results as { followings: number; followers: number };
    } catch (error) {
      throw new SequelizeValidationException(UserFollowingService.name, error);
    }
  }

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
