import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { Base } from '../../shared/entities/base.entity';
import { Role } from '../roles/role.entity';

@Entity('permissions')
export class Permission extends Base {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  @JoinTable({
    name: 'role_id',
  })
  roles: Role[];
}
