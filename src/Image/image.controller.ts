import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './image.service'; // Using the service you provided

//@Controller('upload')
export class UploadController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @UseInterceptors(FileInterceptor('file')) // Handle file upload
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded.');
    }
    
    return await this.cloudinaryService.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }
}
