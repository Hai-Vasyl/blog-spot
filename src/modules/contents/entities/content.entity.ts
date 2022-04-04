import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Base } from '@/shared/entities/base.entity';
import { Upload } from '@/modules/uploads/upload.entity';
import { User } from '@/modules/users/user.entity';
import { Category } from '@/modules/categories/category.entity';
import { Tag } from '@/modules/tags/tag.entity';
import { Section } from '@/modules/sections/section.entity';
import { AccessTypeEnum } from '@/shared/enums/access-type.enum';
import { ContentRating } from '@/modules/contents/entities/content-rating.entity';
import { Comment } from '@/modules/comments/entities/comment.entity';

@Entity('content')
export class Content extends Base {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: AccessTypeEnum,
    default: AccessTypeEnum.PUBLIC,
  })
  accessType: string;

  @Column({ type: 'int', default: 0 })
  rating: number;

  @ManyToOne(() => Upload, (upload) => upload.uploadContents)
  preview: Upload;

  @ManyToOne(() => User, (user) => user.userContents)
  author: User;

  @ManyToOne(() => Category, (category) => category.categoryContents)
  category: Category;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => Section, (section) => section.content)
  sections: Section[];

  @OneToMany(() => ContentRating, (rating) => rating.content)
  contentRatings: ContentRating[];

  @OneToMany(() => Comment, (comment) => comment.content)
  comments: Comment[];
}
