import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

import { Base } from '@/shared/entities/base.entity';
import { User } from '@/modules/users/user.entity';
import { Content } from '@/modules/contents/entities/content.entity';
import { Section } from '@/modules/sections/section.entity';
import { File } from '@/modules/files/file.entity';

@Entity('tags')
export class Tag extends Base {
  @Column({ type: 'varchar', length: 30, nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  color: string;

  @Column({ type: 'boolean', default: false, name: 'is_user_based' })
  isUserBased: boolean;

  @ManyToOne(() => User, (user) => user.tags)
  @JoinColumn({ name: 'creator_id' })
  creator: User | null;

  // ---

  @ManyToMany(() => Content, (content) => content.tags)
  @JoinTable({
    name: 'tags_contents',
    joinColumn: { name: 'tag_id' },
    inverseJoinColumn: { name: 'content_id' },
  })
  contents: Content[];

  @ManyToMany(() => Section, (section) => section.tags)
  @JoinTable({
    name: 'tags_sections',
    joinColumn: { name: 'tag_id' },
    inverseJoinColumn: { name: 'section_id' },
  })
  sections: Section[];

  @ManyToMany(() => File, (file) => file.tags)
  @JoinTable({
    name: 'tags_files',
    joinColumn: { name: 'tag_id' },
    inverseJoinColumn: { name: 'file_id' },
  })
  files: File[];

  @ManyToMany(() => User, (user) => user.tagsUserBased)
  @JoinTable({
    name: 'tags_users',
    joinColumn: { name: 'tag_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users: User[];
}
