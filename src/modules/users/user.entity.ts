import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

import { GenderEnum } from '@/modules/users/enums/gender.enum';
import { Base } from '@/shared/entities/base.entity';
import { LoginMethodEnum } from './enums/login-method.enum';
import { Role } from '../roles/role.entity';
import { Category } from '../categories/category.entity';
import { Content } from '../contents/entities/content.entity';
import { Permission } from '@/modules/permissions/permission.entity';
import { Section } from '@/modules/sections/section.entity';
import { Bookmark } from '@/modules/bookmarks/bookmark.entity';
import { Comment } from '@/modules/comments/entities/comment.entity';
import { CommentRating } from '@/modules/comments/entities/comment-rating.entity';
import { ContentRating } from '@/modules/contents/entities/content-rating.entity';
import { Tag } from '@/modules/tags/tag.entity';
import { File } from '@/modules/files/file.entity';
import { SubscriberPublisher } from '@/modules/subscribers-publishers/subscriber-publisher.entity';

@Entity('users')
export class User extends Base {
  @Column({ type: 'varchar', nullable: false, length: 30, name: 'first_name' })
  firstName: string;

  @Column({ type: 'varchar', nullable: false, length: 30, name: 'last_name' })
  lastName: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'enum', enum: GenderEnum, nullable: false })
  gender: GenderEnum;

  @Column({ type: Date })
  birth: Date | null;

  @Column({ type: 'varchar', nullable: false })
  color: string;

  @Column({ type: 'varchar', length: 300 })
  bio: string | null;

  @Column({
    type: 'enum',
    enum: LoginMethodEnum,
    default: LoginMethodEnum.LOCAL,
    name: 'login_method',
  })
  loginMethod: LoginMethodEnum;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @ManyToOne(() => File, (file) => file.users)
  avatar: File | null;

  // ---

  @OneToMany(() => Content, (content) => content.creator)
  contents: Content[];

  @OneToMany(() => Role, (role) => role.creator)
  roles: Role[];

  @OneToMany(() => Category, (category) => category.creator)
  categories: Category[];

  @OneToMany(() => Permission, (permission) => permission.creator)
  permissions: Permission[];

  @OneToMany(() => Section, (section) => section.creator)
  sections: Section[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.creator)
  bookmarks: Bookmark[];

  @OneToMany(() => Comment, (comment) => comment.creator)
  comments: Comment[];

  @OneToMany(() => CommentRating, (commentRating) => commentRating.creator)
  commentRatings: CommentRating[];

  @OneToMany(() => ContentRating, (contentRating) => contentRating.creator)
  contentRatings: ContentRating[];

  @OneToMany(() => Tag, (tag) => tag.creator)
  tags: Tag[];

  @OneToMany(() => File, (file) => file.creator)
  files: File[];

  @OneToMany(
    () => SubscriberPublisher,
    (subscriberPublisher) => subscriberPublisher.subscriber,
  )
  subscribersPublishers: SubscriberPublisher[];

  @OneToMany(
    () => SubscriberPublisher,
    (subscriberPublisher) => subscriberPublisher.publisher,
  )
  publishersSubscribers: SubscriberPublisher[];

  @ManyToMany(() => Tag, (tag) => tag.users)
  tagsUserBased: Tag[];
}
