import { User } from '@/modules/users/user.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

import { Base } from '../../shared/entities/base.entity';
import { Role } from '../roles/role.entity';

@Entity('permissions')
export class Permission extends Base {
  @Column({ type: 'varchar', nullable: false, length: 100 })
  name: string;

  @Column({ type: 'varchar', nullable: false, length: 300 })
  description: string;

  @ManyToOne(() => User, (user) => user.permissions)
  @JoinColumn({ name: 'creator_id' })
  creator: User | null;

  // ---

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
