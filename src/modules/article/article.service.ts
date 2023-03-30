import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindOptions, Op } from 'sequelize';
import { ServiceError } from 'src/classes/ServiceError';
import { SequelizeValidationException } from 'src/exceptions/sequelize-validation/sequelize-validation.exception';
import { JwtPayload } from 'src/shared/interfaces';
import { ArticleTagMapService } from '../article-tag-map/article-tag-map.service';
import { TagModel } from '../tag/tag.model';
import { TagService } from '../tag/tag.service';
import { UserModel } from '../user/user.model';
import { ArticleModel } from './article.model';
import { ArticleCreateDTO } from './dto/in/article-create.dto';
import {
  ArticleQueryPostDTO,
  isArticleQueryPostDTO,
} from './dto/in/article-query-post.dto';
import { ArticleQueryDTO } from './dto/in/article-query.dto';

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

  async findAll(query: ArticleQueryDTO | ArticleQueryPostDTO) {
    try {
      const { keyword, beginDate, endDate, sortBy, sortDir } = query;
      const isPost = isArticleQueryPostDTO(query);

      const order: FindOptions['order'] = [];

      if (sortBy) {
        order.push([sortBy, sortDir ?? 'desc']);
      }

      if (isPost && query.sorter) {
        query.sorter.forEach((el) => {
          order.push([el.sortBy, el.sortDir]);
        });
      }

      const articleList = await this.articleRepo.findAll({
        where: {
          ...(keyword && {
            content: {
              [Op.like]: `%${keyword}%`,
            },
          }),
          ...((beginDate || endDate) && {
            createdAt: {
              [Op.and]: {
                [Op.gte]: beginDate,
                [Op.lte]: endDate,
              },
            },
          }),
        },
        include: [
          {
            model: TagModel,
            attributes: ['id', 'name'],
          },
          {
            model: UserModel,
            attributes: ['id', 'slug', 'createdAt', 'nickname', 'icon'],
          },
        ],
        ...(order.length > 0 && {
          order,
        }),
      });
      return articleList;
    } catch (error) {
      throw new SequelizeValidationException(ArticleService.name, error);
    }
  }

  async findArticleById(id: number) {
    try {
      const article = await this.articleRepo.findOne({ where: { id } });
      if (!article)
        throw new BadRequestException(ArticleService.name, {
          cause: new ServiceError('Article Not Found', {
            key: 'error.notFound',
            args: {
              obj: 'article',
            },
          }),
        });
      return article;
    } catch (error) {
      throw new SequelizeValidationException(ArticleService.name, error);
    }
  }

  async findArticleBySlug(slug: string) {
    try {
      const article = await this.articleRepo.findOne({ where: { slug } });
      if (!article)
        throw new BadRequestException(ArticleService.name, {
          cause: new ServiceError('Article Not Found', {
            key: 'error.notFound',
            args: {
              obj: 'article',
            },
          }),
        });
      return article;
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
