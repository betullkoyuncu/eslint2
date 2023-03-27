import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ServiceError } from 'src/classes/ServiceError';
import { SequelizeValidationException } from 'src/exceptions/sequelize-validation/sequelize-validation.exception';
import { JwtPayload } from 'src/shared/interfaces';
import { ArticleTagMapModel } from '../article-tag-map/article-tag-map.model';
import { ArticleTagMapService } from '../article-tag-map/article-tag-map.service';
import { TagService } from '../tag/tag.service';
import { ArticleModel } from './article.model';
import { ArticleCreateDTO } from './dto/in/article-create.dto';

@Injectable()
export class ArticleService {
  constructor(
    @Inject(ArticleModel.name)
    private readonly articleRepo: typeof ArticleModel,
    private readonly articleTagMapService: ArticleTagMapService,
    private readonly tagService: TagService,
  ) {}

  async createArticle(articleCreateDTO: ArticleCreateDTO, jwtUser: JwtPayload) {
    try {
      const articleBuild = this.articleRepo.build({ ...articleCreateDTO });

      articleBuild.setDataValue('writerId', jwtUser.id);
      articleBuild.setSlug();

      await articleBuild.validate();
      const saved = await articleBuild.save();

      return {
        id: saved.id,
        slug: saved.slug,
      };
    } catch (error) {
      throw new SequelizeValidationException(ArticleService.name, error);
    }
  }

  async mapTagToArticle(articleId: number, tagIds: number[]) {
    const existsTags = await this.tagService.findAll(tagIds);
    const article = await this.articleRepo.findOne({
      where: { id: articleId },
    });

    if (!article)
      throw new NotFoundException(ArticleService.name, {
        cause: new ServiceError('Article Not Found In Mapping Tag', {
          key: 'error.notFound',
          args: {
            obj: 'article',
          },
        }),
      });

    const map = await this.articleTagMapService.mapTagsToArticle(
      article.id,
      existsTags.map((el) => el.id),
    );
    return map;
  }
}
