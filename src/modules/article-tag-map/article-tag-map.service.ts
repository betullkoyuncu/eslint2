import { Inject, Injectable } from '@nestjs/common';
import { SequelizeValidationException } from 'src/exceptions/sequelize-validation/sequelize-validation.exception';
import { ArticleTagMapModel } from './article-tag-map.model';

@Injectable()
export class ArticleTagMapService {
  constructor(
    @Inject(ArticleTagMapModel.name)
    private readonly articleTagMapRepo: typeof ArticleTagMapModel,
  ) {}

  async mapTagsToArticle(articleId: number, tagIds: number[]) {
    try {
      const map = await this.articleTagMapRepo.bulkCreate(
        tagIds.map((tagId) => ({
          tagId,
          articleId,
        })),
        {
          ignoreDuplicates: true,
          validate: true,
        },
      );
      return map;
    } catch (error) {
      throw new SequelizeValidationException(ArticleTagMapService.name, error);
    }
  }
}
