import { HttpException, Inject, Injectable } from '@nestjs/common';
import { SequelizeValidationException } from 'src/exceptions/sequelize-validation-exception/sequelize-validation-exception';
import { RegisterUserDTO } from './dto/in/register-user.dto';
import { User } from './user.entity';
import { v4 } from 'uuid';

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
      const user = await userBuild.save({});
      return user.toAuthJSON();
    } catch (error) {
      throw new HttpException(UserService.name, 500, { cause: error });
    }
  }
}
