import { Injectable } from '@nestjs/common';

import { User } from '@/modules/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  // @InjectRepository(User) private readonly repository: Repository<User>,
  // public constructor() {
  //   super();
  // }
}
