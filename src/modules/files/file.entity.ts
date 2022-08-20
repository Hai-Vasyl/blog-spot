import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { User } from '@/modules/users/user.entity';
import { Category } from '@/modules/categories/category.entity';
import { AccessTypeEnum } from '@/shared/enums/access-type.enum';
import { Base } from '@/shared/entities/base.entity';
import { Feature } from '@/shared/common/feature';
import { FileTypeEnum } from '@/modules/files/enums/file-type.enum';

@Schema({ timestamps: true })
export class File extends Base {
  @Prop({ type: String, unique: true, required: true })
  url: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  mimetype: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({
    type: String,
    enum: Object.values(AccessTypeEnum),
    default: AccessTypeEnum.PUBLIC,
  })
  accessType: AccessTypeEnum;

  @Prop({
    type: String,
    enum: Object.values(FileTypeEnum),
    default: FileTypeEnum.IMAGE,
  })
  fileType: FileTypeEnum;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  creator: User | string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Category | string;
}

export type FileDoc = File & Document;
export const FileSchema = SchemaFactory.createForClass(File);
export const FileFeature = new Feature(File.name, FileSchema);
