import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { User } from '@/modules/users/user.entity';
import { Category } from '@/modules/categories/category.entity';
import { AccessTypeEnum } from '@/shared/enums/access-type.enum';
import { Base } from '@/shared/entities/base.entity';
import { FileTypeEnum } from '@/modules/files/enums/file-type.enum';
import { Section } from '@/modules/sections/section.entity';
import { SizeEnum } from '@/modules/files/enums/size.enum';
import { Content } from '@/modules/contents/entities/content.entity';
import { Tag } from '@/modules/tags/tag.entity';
import { Notification } from '@/modules/notifications/notification.entity';

@Entity('files')
export class File extends Base {
  @Column({ type: 'varchar', nullable: false })
  url: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  mimetype: string;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  title: string;

  @Column({ type: 'varchar', length: 300 })
  description: string | null;

  @Column({
    type: 'enum',
    enum: AccessTypeEnum,
    default: AccessTypeEnum.PUBLIC,
    name: 'access_type',
  })
  accessType: AccessTypeEnum;

  @Column({
    type: String,
    enum: FileTypeEnum,
    nullable: false,
    name: 'file_type',
  })
  fileType: FileTypeEnum;

  @Column({ type: 'enum', enum: SizeEnum, nullable: false })
  size: SizeEnum;

  @ManyToOne(() => User, (user) => user.files)
  @JoinColumn({ name: 'creator_id' })
  creator: User | null;

  // ---

  @OneToMany(() => User, (user) => user.avatar)
  users: User[];

  @OneToMany(() => Content, (content) => content.preview)
  contents: Content[];

  @OneToMany(() => Section, (section) => section.preview)
  sections: Section[];

  @OneToMany(() => Category, (category) => category.preview)
  categories: Category[];

  @OneToMany(() => Notification, (notification) => notification.contextFile)
  notifications: Notification[];

  @ManyToMany(() => Tag, (tag) => tag.files)
  tags: Tag[];
}
