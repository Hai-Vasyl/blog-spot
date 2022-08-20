import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { Rating } from '@/shared/entities/rating.entity';
import { User } from '@/modules/users/user.entity';
import { Comment } from '@/modules/comments/entities/comment.entity';
import { Feature } from '@/shared/common/feature';

@Schema({ timestamps: true })
export class CommentRating extends Rating {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User | string;

  @Prop({ type: Types.ObjectId, ref: 'Comment', required: true })
  comment: Comment | string;
}

export type CommentRatingDoc = CommentRating & Document;
export const CommentRatingSchema = SchemaFactory.createForClass(CommentRating);
export const CommentRatingFeature = new Feature(
  CommentRating.name,
  CommentRatingSchema,
);
