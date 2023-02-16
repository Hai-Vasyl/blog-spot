import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

import { Base } from '@/shared/entities/base.entity';
import { Content } from '@/modules/contents/entities/content.entity';
import { User } from '@/modules/users/user.entity';
import { AccessTypeEnum } from '@/shared/enums/access-type.enum';
import { Tag } from '@/modules/tags/tag.entity';
import { File } from '@/modules/files/file.entity';

@Entity('sections')
export class Section extends Base {
  @Column({ type: 'varchar', nullable: false, length: 50 })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  body: string;

  @Column({
    type: 'enum',
    enum: AccessTypeEnum,
    default: AccessTypeEnum.PUBLIC,
    name: 'access_type',
  })
  accessType: string;

  @Column({ type: 'boolean', default: false, name: 'is_important' })
  isImportant: boolean;

  @Column({ type: 'int', default: 1 })
  order: number;

  @ManyToOne(() => User, (user) => user.sections)
  @JoinColumn({ name: 'creator_id' })
  creator: User | null;

  @ManyToOne(() => Content, (content) => content.sections, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'content_id' })
  content: Content | null;

  @ManyToOne(() => File, (file) => file.sections)
  @JoinColumn({ name: 'preview_id' })
  preview: File | null;

  // ---

  @ManyToMany(() => Tag, (tag) => tag.sections)
  tags: Tag[];
}
