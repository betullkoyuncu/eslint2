import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ArticleControllerV1 } from './article.controllerV1';
import { Article } from './article.entity';
import { ArticleService } from './article.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ArticleControllerV1],
  providers: [
    {
      provide: Article.name,
      useValue: Article,
    },
    ArticleService,
  ],
  exports: [ArticleService],
})
export class ArticleModule {}
