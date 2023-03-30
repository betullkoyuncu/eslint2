import { Module } from '@nestjs/common';
import { TagModel } from './tag.model';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';

@Module({
  providers: [
    TagService,
    {
      provide: TagModel.name,
      useValue: TagModel,
    },
  ],
  exports: [TagService],
  controllers: [TagController],
})
export class TagModule {}
