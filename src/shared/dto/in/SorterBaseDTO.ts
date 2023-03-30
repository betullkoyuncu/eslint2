import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SorterDirectionEnum } from 'src/shared/enums';

export class SorterBaseDTO {
  @IsString()
  sortBy: string;

  @IsOptional()
  @IsEnum(SorterDirectionEnum)
  sortDir?: 'desc' | 'asc';
}
