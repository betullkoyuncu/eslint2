import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { JwtUser } from 'src/decorators/jwt-user/jwt-user.decorator';
import { JwtPayload } from 'src/shared/interfaces';
import { ArticleService } from './article.service';
import { ArticleCreateDTO } from './dto/in/article-create.dto';

@Controller('api/article/v1')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  async createArticle(
    @Body() articleCreateDTO: ArticleCreateDTO,
    @JwtUser() jwtUser: JwtPayload,
  ) {
    return this.articleService.createArticle(articleCreateDTO, jwtUser);
  }

  @Get(':id')
  async findArticleById(@Param('id') id: string) {
    return this.articleService.findArticleById(Number(id));
  }

  @Get(':slug')
  async findArticleBySlug(@Param('slug') slug: string) {
    return this.articleService.findArticleBySlug(slug);
  }
}
