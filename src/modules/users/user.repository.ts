import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { User, UserDoc } from '@/modules/users/user.entity';

@Injectable()
export class UserRepository {
  public constructor(
    @InjectModel(User.name) public readonly model: Model<UserDoc>,
  ) {
    this.model = model;
  }
}
