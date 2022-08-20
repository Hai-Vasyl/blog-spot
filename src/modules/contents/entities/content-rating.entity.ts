import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Content } from '@/modules/contents/entities/content.entity';
import { User } from '@/modules/users/user.entity';
import { Rating } from '@/shared/entities/rating.entity';
import { Feature } from '@/shared/common/feature';

@Schema({ timestamps: true })
export class ContentRating extends Rating {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User | string;

  @Prop({ type: Types.ObjectId, ref: 'Content', required: true })
  content: Content | string;
}

export type ContentRatingDoc = ContentRating & Document;
export const ContentRatingSchema = SchemaFactory.createForClass(ContentRating);
export const ContentRatingFeature = new Feature(
  ContentRating.name,
  ContentRatingSchema,
);
