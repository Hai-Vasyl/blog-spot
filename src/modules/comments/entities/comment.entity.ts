import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { Content } from '@/modules/contents/entities/content.entity';
import { User } from '@/modules/users/user.entity';
import { Base } from '@/shared/entities/base.entity';
import { Feature } from '@/shared/common/feature';

@Schema({ timestamps: true })
export class Comment extends Base {
  @Prop({ type: String, required: true })
  body: string;

  @Prop({ type: Number, default: 0 })
  rating: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  creator: User | string;

  @Prop({ type: Types.ObjectId, ref: 'Content', required: true })
  content: Content | string;

  @Prop({ type: Types.ObjectId, ref: 'Comment' })
  comment: Comment | string;
}

export type CommentDoc = Comment & Document;
export const CommentSchema = SchemaFactory.createForClass(Comment);
export const CommentFeature = new Feature(Comment.name, CommentSchema);
