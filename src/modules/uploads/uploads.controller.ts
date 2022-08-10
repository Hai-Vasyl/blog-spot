import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { UploadsService } from '@/modules/uploads/uploads.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFileRequestDTO } from '@/modules/uploads/dto/create-file-request.dto';
import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard';

@Controller('uploads')
export class UploadsController {
  public constructor(private readonly uploadsService: UploadsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  public async createFile(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateFileRequestDTO,
  ) {
    // console.log(JSON.stringify({ dto }, null, 2));
    return this.uploadsService.createFile(req.user.id, file, dto);
  }

  @Delete(':id')
  public async deleteFile(@Param('id') id: string) {
    const res = await this.uploadsService.removeFile(id);
    console.log({ res });
    return res;
  }
}
