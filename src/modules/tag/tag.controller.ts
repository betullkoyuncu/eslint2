import { Controller, Get, Post } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('api/tag/v1')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAllTags() {}
}
