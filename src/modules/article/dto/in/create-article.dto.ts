import { IsString, MaxLength } from 'class-validator';

export class CreateArticleDTO {
  @MaxLength(1000)
  @IsString()
  content: string;
}
