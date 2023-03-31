import { Controller, Get, Post } from '@nestjs/common';
import { TagService } from './tag.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tag')
@Controller('api/tag/v1')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAllTags() {}
}
