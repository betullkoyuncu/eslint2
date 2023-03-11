import { HttpException, Inject, Injectable } from '@nestjs/common';
import { SequelizeValidationException } from 'src/exceptions/sequelize-validation/sequelize-validation.exception';
import { RegisterUserDTO } from './dto/in/register-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@Inject(User.name) private readonly userRepo: typeof User) {}

  async register(registerUserDTO: RegisterUserDTO) {
    const userBuild = this.userRepo.build({ ...registerUserDTO });
    userBuild.setPassword(registerUserDTO.password);
    userBuild.generateSlug();
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
    const user = await this.userRepo.findOne({ where: { email } });
    try {
      return user;
    } catch (error) {
      throw new HttpException(UserService.name, 500, { cause: error });
    }
  }
}
