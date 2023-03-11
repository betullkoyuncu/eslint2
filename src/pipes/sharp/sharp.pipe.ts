import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp';
import { v4 } from 'uuid';

@Injectable()
export class SharpPipe implements PipeTransform {
  async transform(file: Express.Multer.File, _: ArgumentMetadata) {
    const filename = v4();
    const ext = path.extname(file.originalname);
    const ref = `${filename}${ext}`;

    try {
      const sharped = await sharp(file.buffer)
        .png()
        .toFile(path.resolve('uploads', ref));
    } catch (error) {
      console.error(error);
    }
    return { ref };
  }
}
