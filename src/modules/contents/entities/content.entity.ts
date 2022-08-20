import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Base } from '@/shared/entities/base.entity';
import { User } from '@/modules/users/user.entity';
import { Category } from '@/modules/categories/category.entity';
import { AccessTypeEnum } from '@/shared/enums/access-type.enum';
import { Feature } from '@/shared/common/feature';

@Schema({ timestamps: true })
export class Content extends Base {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({
    type: String,
    enum: Object.values(AccessTypeEnum),
    default: AccessTypeEnum.PUBLIC,
  })
  accessType: string;

  @Prop({ type: Number, default: 0 })
  rating: number;

  @Prop({ type: Number, default: 0 })
  comments: number;

  @Prop({ type: String, required: true })
  color: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: User | string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Category | string;

  @Prop({ type: Types.ObjectId, ref: 'File' })
  preview: File | string;
}

export type ContentDoc = Content & Document;
export const ContentSchema = SchemaFactory.createForClass(Content);
export const ContentFeature = new Feature(Content.name, ContentSchema);
