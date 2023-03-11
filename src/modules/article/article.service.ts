import { HttpException, Inject, Injectable } from '@nestjs/common';
import { SequelizeValidationException } from 'src/exceptions/sequelize-validation/sequelize-validation.exception';
import { JwtPayload } from 'src/shared/interfaces';
import { Article } from './article.entity';
import { CreateArticleDTO } from './dto/in/create-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @Inject(Article.name) private readonly articleRepo: typeof Article,
  ) {}

  async createArticle(createArticleDTO: CreateArticleDTO, user: JwtPayload) {
    try {
      const articleBuild = this.articleRepo.build({ ...createArticleDTO });
      articleBuild.generateUuid();
      articleBuild.addWriter(user);
      try {
        await articleBuild.validate();
      } catch (error) {
        throw new SequelizeValidationException(ArticleService.name, error);
      }
      await articleBuild.save();
      return {
        id: articleBuild.id,
        slug: articleBuild.slug,
      };
    } catch (error) {
      throw new HttpException(ArticleService.name, 500, { cause: error });
    }
  }
}
