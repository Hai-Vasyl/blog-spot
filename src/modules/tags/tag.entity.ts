import { Column, Entity, ManyToOne } from 'typeorm';

import { Base } from '@/shared/entities/base.entity';
import { User } from '@/modules/users/user.entity';

@Entity('tag')
export class Tag extends Base {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  color: string;

  @ManyToOne(() => User, (user) => user.tags)
  creator: User;
}
