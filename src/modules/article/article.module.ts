import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { ArticleModel } from './article.model';
import { DatabaseModule } from 'src/database/database.module';
import { TagModule } from '../tag/tag.module';
import { ArticleTagMapModule } from '../article-tag-map/article-tag-map.module';

@Module({
  imports: [DatabaseModule, TagModule, ArticleTagMapModule],
  providers: [
    ArticleService,
    {
      provide: ArticleModel.name,
      useValue: ArticleModel,
    },
  ],
  controllers: [ArticleController],
  exports: [ArticleService],
})
export class ArticleModule {}
