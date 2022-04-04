import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { Timestamp } from '@/shared/entities/timestamp.entity';
import { User } from '@/modules/users/user.entity';
import { Category } from '@/modules/categories/category.entity';
import { Content } from '@/modules/contents/entities/content.entity';
import { Tag } from '@/modules/tags/tag.entity';
import { AccessTypeEnum } from '@/shared/enums/access-type.enum';

@Entity('upload')
export class Upload extends Timestamp {
  @PrimaryColumn({ type: 'varchar', unique: true })
  url: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  urlOrigin: string;

  @Column({ type: 'varchar' })
  nameOrigin: string;

  @Column({ type: 'varchar' })
  mimetype: string;

  @Column({ type: 'varchar' })
  mimetypeOrigin: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: AccessTypeEnum,
    default: AccessTypeEnum.PUBLIC,
  })
  accessType: string;

  @ManyToOne(() => User, (user) => user.userUploads)
  creator: User;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  @ManyToOne(() => Category, (category) => category.categoryUploads)
  category: Category;

  @OneToMany(() => User, (user) => user.avatar)
  uploadUsers: User[];

  @OneToMany(() => Category, (category) => category.preview)
  uploadCategories: Category[];

  @OneToMany(() => Content, (content) => content.preview)
  uploadContents: Content[];
}
