import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { Base } from '@/shared/entities/base.entity';
import { User } from './user.entity';

@Schema({ timestamps: true })
export class Follower extends Base {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  subscriber: User | string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User | string;
}
