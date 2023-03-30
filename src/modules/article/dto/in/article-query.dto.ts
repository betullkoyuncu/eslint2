// import { Transform } from 'class-transformer';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { QueryBaseDTO } from 'src/shared/dto/in/QueryBaseDTO';
import { SorterBaseDTO } from 'src/shared/dto/in/SorterBaseDTO';
import { SorterDirectionEnum } from 'src/shared/enums';

export class ArticleQueryDTO extends QueryBaseDTO implements SorterBaseDTO {
  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsDateString()
  beginDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  // @IsOptional()
  // @Transform(({ value }) => value.toString().split(',').map(Number))
  // tagIds?: number[];

  // @IsOptional()
  // @Transform(({ value }) => value.toString().split(',').map(Number))
  // writerIds?: number[];

  @IsString()
  sortBy: string;

  @IsOptional()
  @IsEnum(SorterDirectionEnum)
  sortDir?: 'desc' | 'asc';
}
