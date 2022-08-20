import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { Base } from '@/shared/entities/base.entity';
import { Content } from '@/modules/contents/entities/content.entity';
import { User } from '@/modules/users/user.entity';
import { AccessTypeEnum } from '@/shared/enums/access-type.enum';
import { Feature } from '@/shared/common/feature';

@Schema({ timestamps: true })
export class Section extends Base {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String, required: true })
  body: string;

  @Prop({
    type: String,
    enum: Object.values(AccessTypeEnum),
    default: AccessTypeEnum.PUBLIC,
  })
  accessType: string;

  @Prop({ type: Boolean, default: false })
  important: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Content', required: true })
  content: Content | string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  creator: User | string;
}

export type SectionDoc = Section & Document;
export const SectionSchema = SchemaFactory.createForClass(Section);
export const SectionFeature = new Feature(Section.name, SectionSchema);
