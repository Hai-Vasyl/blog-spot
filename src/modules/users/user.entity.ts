import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { GenderEnum } from '@/modules/users/enums/gender.enum';
import { Base } from '@/shared/entities/base.entity';
import { RoleEnum } from '@/modules/users/enums/role.enum';
import { Feature } from '@/shared/common/feature';
import { File } from '../files/file.entity';

@Schema({ timestamps: true })
export class User extends Base {
  @Prop({ type: String, required: true, maxlength: 30 })
  firstName: string;

  @Prop({ type: String, required: true, maxlength: 30 })
  lastName: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, enum: Object.values(GenderEnum) })
  gender: GenderEnum;

  @Prop({ type: String, enum: Object.values(RoleEnum), default: RoleEnum.USER })
  role: RoleEnum;

  @Prop({ type: Date })
  birth: Date;

  @Prop({ type: String, required: true })
  color: string;

  @Prop({ type: String })
  bio: string;

  @Prop({ type: Types.ObjectId, ref: 'File' })
  avatar: File | string;
}

export type UserDoc = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
export const UserFeature = new Feature(User.name, UserSchema);
