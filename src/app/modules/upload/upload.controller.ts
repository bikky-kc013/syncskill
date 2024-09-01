import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('v1/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post('/file')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    if (!file)
      throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
    const files = file.buffer;
    return this.uploadService.uploadPublicFile(files, file.originalname);
  }

  @Delete('/delete')
  async deleteFIle(@Param() id: string) {
    return this.uploadService.deletePublicFile(id);
  }
}
