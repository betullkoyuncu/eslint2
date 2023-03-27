import { IsByteLength, IsOptional, IsString, MaxLength } from 'class-validator';

export class ArticleCreateDTO {
  @IsByteLength(0, 2000, {
    message: 'validator.byteSize',
  })
  @IsString({
    message: 'validator.isString',
  })
  content: string;

  @IsOptional()
  @IsString({
    each: true,
  })
  tags: number[];
}
