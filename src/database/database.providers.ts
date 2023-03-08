import { Provider } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

export const databaseProviders: Provider[] = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '!Password',
        database: 'tweeter',
      });
      sequelize.addModels([]);
      await sequelize.sync({ alter: true });
      return sequelize;
    },
  },
];
