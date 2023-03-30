import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SequelizeValidationException } from 'src/exceptions/sequelize-validation/sequelize-validation.exception';
import { JwtPayload } from 'src/shared/interfaces';
import { UserFollowingService } from '../user-following/user-following.service';
import { UserRegisterDTO } from './dto/in/user-register.dto';
import { UserUpdateDTO } from './dto/in/user-update.dto';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserModel.name) private readonly userRepo: typeof UserModel,
    private readonly followingService: UserFollowingService,
  ) {}

  async register(userRegisterDTO: UserRegisterDTO) {
    const userBuild = this.userRepo.build({ ...userRegisterDTO });
    userBuild.setPassword(userRegisterDTO.password).setNickname().setSlug();

    try {
      await userBuild.save();
      return {
        id: userBuild.id,
        email: userBuild.email,
      };
    } catch (error) {
      throw new SequelizeValidationException(UserService.name, error);
    }
  }

  async update(jwtPayload: JwtPayload, userUpdateDTO: UserUpdateDTO) {
    try {
      const user = await this.userRepo.findOne({
        where: { email: jwtPayload.email },
      });
      const { nickname, icon, backgroundImage, profile } = userUpdateDTO;
      await user.update({
        ...(nickname && { nickname }),
        ...(icon && { icon }),
        ...(backgroundImage && { backgroundImage }),
        ...(profile && { profile }),
      });
      return user.toAuthJson();
    } catch (error) {
      throw new SequelizeValidationException(UserService.name, error);
    }
  }

  async findOneByEmail(email: string) {
    try {
      const user = await this.userRepo.findOne({ where: { email } });
      return user;
    } catch (error) {
      throw new SequelizeValidationException(UserService.name, error);
    }
  }

  async followUser(userId: number, followId: number) {
    try {
      const following = await this.followingService.following(userId, followId);
      return following;
    } catch (error) {
      throw new SequelizeValidationException(UserService.name, error);
    }
  }

  async unfollow(userId: number, followId: number) {
    try {
      const unfollowed = await this.followingService.following(
        userId,
        followId,
      );
      return unfollowed;
    } catch (error) {
      throw new SequelizeValidationException(UserService.name, error);
    }
  }
}
