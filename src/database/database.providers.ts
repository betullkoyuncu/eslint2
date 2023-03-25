import { Provider } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { UserModel } from 'src/modules/user/user.model';

export const databaseProviders: Provider[] = [
  {
    provide: Sequelize.name,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '!Password',
        database: 'tweeter',
        timezone: '+08:00',
      });
      sequelize.addModels([UserModel]);
      await sequelize.sync({ alter: false });
      return sequelize;
    },
  },
];
