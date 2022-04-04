import { Module } from '@nestjs/common';

import { UploadsService } from '@/modules/uploads/uploads.service';
import { UploadsController } from '@/modules/uploads/uploads.controller';

@Module({
  imports: [],
  controllers: [UploadsController],
  providers: [UploadsService],
})
export class UploadsModule {}
