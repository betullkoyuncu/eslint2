import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ArticleTagMapModel } from './article-tag-map.model';
import { ArticleTagMapService } from './article-tag-map.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: ArticleTagMapModel.name,
      useValue: ArticleTagMapModel,
    },
    ArticleTagMapService,
  ],
  exports: [ArticleTagMapService],
})
export class ArticleTagMapModule {}
