
import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './image.provider';
import { CloudinaryService } from './image.service';
import { UploadController } from './image.controller';

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}