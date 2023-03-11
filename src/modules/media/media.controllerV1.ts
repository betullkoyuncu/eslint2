import {
  Controller,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SharpPipe } from 'src/pipes/sharp/sharp.pipe';

@Controller('api/media/v1')
export class MediaControllerV1 {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async updateFile(
    @UploadedFile(
      new ParseFilePipe({
        // 300kb
        validators: [new MaxFileSizeValidator({ maxSize: 1_000 * 300 })],
      }),
      SharpPipe,
    )
    file: Express.Multer.File[],
  ) {
    console.log(file);
    return '';
  }
}
