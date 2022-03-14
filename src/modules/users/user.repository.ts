import { EntityRepository, Repository } from 'typeorm';

import { User } from '@/modules/users/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  createUser() {
    return new User();
  }
}
