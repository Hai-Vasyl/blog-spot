import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

import { User } from '@/modules/users/user.entity';
import { Category } from '@/modules/categories/category.entity';
import { AccessTypeEnum } from '@/shared/enums/access-type.enum';
import { Base } from '@/shared/entities/base.entity';
import { FileTypeEnum } from '@/modules/files/enums/file-type.enum';
import { SizeEnum } from './enums/size.enum';
import { Content } from '../contents/entities/content.entity';

@Entity('files')
export class File extends Base {
  @Column({ type: 'varchar', nullable: false })
  url: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  relation: string;

  @Column({ type: 'varchar', nullable: false })
  mimetype: string;

  @Column({ type: 'varchar', nullable: false, length: 100 })
  title: string;

  @Column({ type: 'varchar', length: 300 })
  description: string;

  @Column({ type: 'int', default: 1 })
  order: number;

  @Column({ type: 'boolean', default: false, name: 'is_active' })
  isActive: boolean;

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
  creator: User;

  @ManyToMany(() => Category, (category) => category.fileRefs)
  @JoinTable({
    name: 'category_id',
  })
  categoryRefs: Category[];

  @ManyToMany(() => Content, (content) => content.fileRefs)
  @JoinTable({
    name: 'content_id',
  })
  contentRefs: Content[];
}
