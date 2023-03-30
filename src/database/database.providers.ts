import { Provider } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { ArticleTagMapModel } from 'src/modules/article-tag-map/article-tag-map.model';
import { ArticleModel } from 'src/modules/article/article.model';
import { TagModel } from 'src/modules/tag/tag.model';
import { UserFollowingModel } from 'src/modules/user-following/user-following.model';
import { UserModel } from 'src/modules/user/user.model';

export const databaseProviders: Provider[] = [
  {
    provide: Sequelize.name,
    useFactory: async () => {
      try {
        const sequelize = new Sequelize({
          dialect: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '!Password',
          database: 'tweeter',
          timezone: '+08:00',
        });
        sequelize.addModels([
          UserModel,
          UserFollowingModel,
          ArticleModel,
          TagModel,
          ArticleTagMapModel,
        ]);
        await sequelize.sync({ force: true });
        return sequelize;
      } catch (error) {
        console.error(error);
      }
    },
  },
];
