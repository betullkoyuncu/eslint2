import { Type } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class ArticleQueryDTO {
  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsDateString()
  beginDate?: number;

  @IsOptional()
  @IsDateString()
  endDate?: number;

  @IsOptional()
  @IsNumber({}, { each: true })
  tagIds?: number[];
}
