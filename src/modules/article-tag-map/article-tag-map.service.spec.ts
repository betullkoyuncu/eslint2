import { Test, TestingModule } from '@nestjs/testing';
import { ArticleTagMapService } from './article-tag-map.service';

describe('ArticleTagMapService', () => {
  let service: ArticleTagMapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleTagMapService],
    }).compile();

    service = module.get<ArticleTagMapService>(ArticleTagMapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
