import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { Base } from '@/shared/entities/base.entity';
import { User } from '@/modules/users/user.entity';
import { Feature } from '@/shared/common/feature';

@Schema({ timestamps: true })
export class Category extends Base {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String, required: true })
  color: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  creator: User | string;

  @Prop({ type: Types.ObjectId, ref: 'File' })
  preview: File | string;
}

export type CategoryDoc = Category & Document;
export const CategorySchema = SchemaFactory.createForClass(Category);
export const CategoryFeature = new Feature(Category.name, CategorySchema);
