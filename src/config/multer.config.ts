import { type MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as path from 'path';

export const multerOptions: MulterOptions = {
  dest: path.join(__dirname, '../../uploads'),
};
