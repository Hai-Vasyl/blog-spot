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

import { FilesService } from '@/modules/files/files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFileRequestDTO } from '@/modules/files/dto/create-file-request.dto';
import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard';

@Controller('files')
export class FilesController {
  public constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  public async createFile(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateFileRequestDTO,
  ) {
    // console.log(JSON.stringify({ dto }, null, 2));
    return this.filesService.createFile(req.user.id, file, dto);
  }

  @Delete(':id')
  public async deleteFile(@Param('id') id: string) {
    const res = await this.filesService.removeFile(id);
    console.log({ res });
    return res;
  }
}
