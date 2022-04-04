import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { Content } from '@/modules/contents/entities/content.entity';
import { User } from '@/modules/users/user.entity';
import { Base } from '@/shared/entities/base.entity';
import { CommentRating } from '@/modules/comments/entities/comment-rating.entity';

@Entity('comment')
export class Comment extends Base {
  @Column({ type: 'text' })
  body: string;

  @Column({ type: 'int', default: 0 })
  rating: number;

  @ManyToOne(() => User, (user) => user.comments)
  author: User;

  @ManyToOne(() => Content, (content) => content.comments)
  content: Content;

  @ManyToOne(() => Comment, (comment) => comment.replies)
  comment: Comment;

  @OneToMany(() => Comment, (comment) => comment.comment, {
    cascade: ['remove'],
  })
  replies: Comment[];

  @ManyToOne(() => CommentRating, (commentRating) => commentRating.comment, {
    cascade: ['remove'],
  })
  commentRatings: CommentRating[];
}
