import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { GenderEnum } from '@/modules/users/enums/gender.enum';
import { Base } from '@/shared/entities/base.entity';
import { RoleEnum } from '@/modules/users/enums/role.enum';
import { Upload } from '@/modules/uploads/upload.entity';
import { Category } from '@/modules/categories/category.entity';
import { Content } from '@/modules/contents/entities/content.entity';
import { Tag } from '@/modules/tags/tag.entity';
import { Section } from '@/modules/sections/section.entity';
import { ContentRating } from '@/modules/contents/entities/content-rating.entity';
import { Comment } from '@/modules/comments/entities/comment.entity';
import { CommentRating } from '@/modules/comments/entities/comment-rating.entity';

@Entity('user')
export class User extends Base {
  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: GenderEnum, nullable: true })
  gender: GenderEnum;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.USER })
  role: RoleEnum;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ type: 'varchar' })
  color: string;

  @ManyToOne(() => Upload, (upload) => upload.uploadUsers)
  avatar: Upload;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => Upload, (upload) => upload.creator)
  userUploads: Upload[];

  @OneToMany(() => Category, (category) => category.creator)
  userCategories: Category[];

  @OneToMany(() => Content, (content) => content.author)
  userContents: Content[];

  @OneToMany(() => Tag, (tag) => tag.creator)
  userTags: Tag[];

  @OneToMany(() => Section, (section) => section.creator)
  userSections: Section[];

  @OneToMany(() => ContentRating, (rating) => rating.user)
  userContentRatings: ContentRating[];

  @OneToMany(() => CommentRating, (commentRating) => commentRating.user)
  userCommentRatings: CommentRating[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}
