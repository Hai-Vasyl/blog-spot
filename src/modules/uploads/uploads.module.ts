import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UploadsService } from '@/modules/uploads/uploads.service';
import { UploadsController } from '@/modules/uploads/uploads.controller';
import { UploadRepository } from '@/modules/uploads/upload.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UploadRepository]), ConfigModule],
  controllers: [UploadsController],
  providers: [UploadsService],
})
export class UploadsModule {}
