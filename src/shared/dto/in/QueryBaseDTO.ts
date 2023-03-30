import { IsNumber, IsOptional, Max } from 'class-validator';

export class QueryBaseDTO {
  @IsOptional()
  @Max(100)
  @IsNumber()
  limit?: number = 20;

  @IsOptional()
  @IsNumber()
  offset?: number = 0;
}
