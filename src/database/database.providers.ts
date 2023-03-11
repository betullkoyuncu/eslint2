import { Provider } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { ArticleBookmark } from 'src/modules/article-bookmark/article-bookmark.entity';
import { Article } from 'src/modules/article/article.entity';
import { UserRelationship } from 'src/modules/user-relationship/relationship.entity';
import { User } from 'src/modules/user/user.entity';

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
        timezone: '+08:00',
      });
      sequelize.addModels([User, UserRelationship, Article, ArticleBookmark]);
      await sequelize.sync({ alter: true });
      return sequelize;
    },
  },
];
