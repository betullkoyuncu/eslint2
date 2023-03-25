import { HttpException, Inject, Injectable } from '@nestjs/common';
import { SequelizeValidationException } from 'src/exceptions/sequelize-validation/sequelize-validation.exception';
import { UserRegisterDTO } from './dto/in/user-register.dto';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserModel.name) private readonly userRepo: typeof UserModel,
  ) {}

  async register(userRegisterDTO: UserRegisterDTO) {
    const userBuild = this.userRepo.build({ ...userRegisterDTO });
    userBuild.setPassword(userRegisterDTO.password);
    userBuild.setSlug();

    try {
      await userBuild.validate();
    } catch (error) {
      throw new SequelizeValidationException(UserService.name, error);
    }

    try {
      await userBuild.save();
      return {
        id: userBuild.id,
        email: userBuild.email,
      };
    } catch (error) {
      throw new HttpException(UserService.name, 500, { cause: error });
    }
  }

  async findOneByEmail(email: string) {
    try {
      const user = await this.userRepo.findOne({ where: { email } });
      return user;
    } catch (error) {
      throw new HttpException(UserService.name, 500, { cause: error });
    }
  }
}
