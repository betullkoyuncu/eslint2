import { Module } from '@nestjs/common';
import { MediaControllerV1 } from './media.controllerV1';
import { MediaService } from './media.service';

@Module({
  controllers: [MediaControllerV1],
  providers: [MediaService],
})
export class MediaModule {}
