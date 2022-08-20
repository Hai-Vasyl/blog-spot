import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { File, FileDoc } from '@/modules/files/file.entity';

@Injectable()
export class FileRepository {
  public constructor(
    @InjectModel(File.name) public readonly model: Model<FileDoc>,
  ) {
    this.model = model;
  }
}
