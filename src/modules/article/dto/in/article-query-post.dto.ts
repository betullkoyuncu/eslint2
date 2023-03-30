import { Type } from 'class-transformer';
import { IsNumber, ValidateNested, IsOptional } from 'class-validator';
import { SorterBaseDTO } from 'src/shared/dto/in/SorterBaseDTO';
import { SorterDirectionEnum } from 'src/shared/enums';
import { ArticleQueryDTO } from './article-query.dto';

export class ArticleQueryPostDTO extends ArticleQueryDTO {
  @IsOptional()
  @IsNumber({}, { each: true })
  tagIds?: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  writerIds?: number[];

  @ValidateNested({
    each: true,
  })
  @Type(() => SorterBaseDTO)
  sorter?: SorterBaseDTO[];
}

export const isArticleQueryPostDTO = (
  dto: ArticleQueryDTO | ArticleQueryPostDTO,
): dto is ArticleQueryPostDTO => {
  if (!dto) return false;
  if ('sorter' in dto) return true;
  return false;
};
