import { Module } from '@nestjs/common';
import { ArticleControllerV1 } from './article.controllerV1';
import { ArticleService } from './article.service';

@Module({
  controllers: [ArticleControllerV1],
  providers: [ArticleService],
})
export class ArticleModule {}
