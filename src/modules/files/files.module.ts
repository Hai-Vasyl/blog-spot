import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { FilesService } from '@/modules/files/files.service';
import { FilesController } from '@/modules/files/files.controller';
import { FileFeature } from './file.entity';

@Module({
  imports: [MongooseModule.forFeature([FileFeature]), ConfigModule],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
