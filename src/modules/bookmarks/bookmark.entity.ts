import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { Base } from '@/shared/entities/base.entity';
import { Content } from '../contents/entities/content.entity';
import { User } from '../users/user.entity';
import { AccessTypeEnum } from '@/shared/enums/access-type.enum';
import { Feature } from '@/shared/common/feature';

@Schema({ timestamps: true })
export class Bookmark extends Base {
  @Prop({ type: String })
  color: string;

  @Prop({
    type: String,
    enum: Object.values(AccessTypeEnum),
    default: AccessTypeEnum.PUBLIC,
  })
  accessType: string;

  @Prop({ type: Types.ObjectId, ref: 'Content', required: true })
  content: Content | string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  creator: User | string;
}

export type BookmarkDoc = Bookmark & Document;
export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);
export const BookmarkFeature = new Feature(Bookmark.name, BookmarkSchema);
