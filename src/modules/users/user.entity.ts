import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { GenderEnum } from '@/modules/users/enums/gender.enum';
import { Base } from '@/shared/entities/base.entity';
import { File } from '../files/file.entity';
import { LoginMethodEnum } from './enums/login-method.enum';
import { Role } from '../roles/role.entity';
import { Category } from '../categories/category.entity';
import { Content } from '../contents/entities/content.entity';

@Entity('users')
export class User extends Base {
  @Column({ type: 'varchar', nullable: false, length: 30 })
  firstName: string;

  @Column({ type: 'varchar', nullable: false, length: 30 })
  lastName: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'enum', enum: GenderEnum, nullable: false })
  gender: GenderEnum;

  @Column({ type: Date })
  birth: Date;

  @Column({ type: 'varchar', nullable: false })
  color: string;

  @Column({ type: 'varchar', length: 300 })
  bio: string;

  @Column({
    type: String,
    enum: Object.values(LoginMethodEnum),
    default: LoginMethodEnum.LOCAL,
    name: 'login_method',
  })
  loginMethod: LoginMethodEnum;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToMany(() => File, (file) => file.creator)
  files: File[];

  @OneToMany(() => Category, (category) => category.creator)
  categories: Category[];

  @OneToMany(() => Content, (content) => content.creator)
  contents: Content[];
}
