import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { JwtUser } from 'src/decorators/jwt-user/jwt-user.decorator';
import { JwtPayload } from 'src/shared/interfaces';
import { ArticleService } from './article.service';
import { ArticleCreateDTO } from './dto/in/article-create.dto';
import { ArticleQueryPostDTO } from './dto/in/article-query-post.dto';
import { ArticleQueryDTO } from './dto/in/article-query.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('article')
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

  @Get()
  async findArticles(@Query() query: ArticleQueryDTO) {
    return this.articleService.findAll(query);
  }

  @Post('list')
  async findArticlesByPost(@Body() body: ArticleQueryPostDTO) {
    return this.articleService.findAll(body);
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
