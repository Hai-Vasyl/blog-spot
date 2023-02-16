import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Base } from '@/shared/entities/base.entity';
import { User } from '@/modules/users/user.entity';
import { Category } from '@/modules/categories/category.entity';
import { AccessTypeEnum } from '@/shared/enums/access-type.enum';
import { Section } from '@/modules/sections/section.entity';
import { Bookmark } from '@/modules/bookmarks/bookmark.entity';
import { Comment } from '@/modules/comments/entities/comment.entity';
import { ContentRating } from '@/modules/contents/entities/content-rating.entity';
import { Tag } from '@/modules/tags/tag.entity';
import { File } from '@/modules/files/file.entity';
import { Notification } from '@/modules/notifications/notification.entity';

@Entity('contents')
export class Content extends Base {
  @Column({ type: 'varchar', nullable: false, length: 50 })
  title: string;

  @Column({ type: 'varchar', nullable: false, length: 300 })
  description: string;

  @Column({
    type: 'enum',
    enum: AccessTypeEnum,
    default: AccessTypeEnum.PUBLIC,
    name: 'access_type',
  })
  accessType: AccessTypeEnum;

  @Column({ type: 'int', default: 0, name: 'ratings_number' })
  ratingsNumber: number;

  @Column({ type: 'int', default: 0, name: 'comments_number' })
  commentsNumber: number;

  @Column({ type: 'varchar', nullable: false })
  color: string;

  @ManyToOne(() => User, (user) => user.contents)
  @JoinColumn({ name: 'creator_id' })
  creator: User | null;

  @ManyToOne(() => Category, (category) => category.contents)
  @JoinColumn({ name: 'category_id' })
  category: Category | null;

  @ManyToOne(() => File, (file) => file.contents)
  @JoinColumn({ name: 'preview_id' })
  preview: File | null;

  // ---

  @OneToMany(() => Section, (section) => section.content)
  sections: Section[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.content)
  bookmarks: Bookmark[];

  @OneToMany(() => Comment, (comment) => comment.content)
  comments: Comment[];

  @OneToMany(() => ContentRating, (contentRating) => contentRating.content)
  contentRatings: ContentRating[];

  @OneToMany(() => Notification, (notification) => notification.contextContent)
  notifications: Notification[];

  @ManyToMany(() => Tag, (tag) => tag.contents)
  tags: Tag[];
}
