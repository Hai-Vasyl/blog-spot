import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Base } from '@/shared/entities/base.entity';
import { User } from '@/modules/users/user.entity';
import { File } from '../files/file.entity';
import { Content } from '../contents/entities/content.entity';

@Entity('categories')
export class Category extends Base {
  @Column({ type: 'varchar', nullable: false, length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  color: string;

  @ManyToOne(() => User, (user) => user.categories)
  creator: User;

  @OneToMany(() => Content, (content) => content.category)
  contents: Content[];

  @ManyToMany(() => File, (file) => file.categories)
  @JoinTable({
    name: 'file_id',
  })
  fileRefs: File[];
}
