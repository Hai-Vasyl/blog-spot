import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { Base } from '@/shared/entities/base.entity';
import { User } from '@/modules/users/user.entity';
import { Feature } from '@/shared/common/feature';

@Schema({ timestamps: true })
export class Tag extends Base {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  color: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  creator: User | string;
}

export type TagDoc = Tag & Document;
export const TagSchema = SchemaFactory.createForClass(Tag);
export const TagFeature = new Feature(Tag.name, TagSchema);
