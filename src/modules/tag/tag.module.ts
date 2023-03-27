import { Module } from '@nestjs/common';
import { TagModel } from './tag.model';
import { TagService } from './tag.service';

@Module({
  providers: [
    TagService,
    {
      provide: TagModel.name,
      useValue: TagModel,
    },
  ],
  exports: [TagService],
})
export class TagModule {}
