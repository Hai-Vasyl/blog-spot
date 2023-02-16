import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { Content } from '@/modules/contents/entities/content.entity';
import { User } from '@/modules/users/user.entity';
import { Base } from '@/shared/entities/base.entity';
import { CommentRating } from '@/modules/comments/entities/comment-rating.entity';
import { Notification } from '@/modules/notifications/notification.entity';

@Entity('comments')
export class Comment extends Base {
  @Column({ type: 'varchar', nullable: false, length: 300 })
  body: string;

  @Column({ type: 'int', default: 0, name: 'ratings_number' })
  ratingsNumber: number;

  @Column({ type: 'int', default: 0, name: 'comments_number' })
  commentsNumber: number;

  @Column({ type: 'boolean', default: false, name: 'is_attached' })
  isAttached: boolean;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'creator_id' })
  creator: User | null;

  @ManyToOne(() => Content, (content) => content.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'content_id' })
  content: Content | null;

  @ManyToOne(() => Comment, (comment) => comment.childComments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_comment_id' })
  parentComment: Comment | null;

  // ---

  @OneToMany(() => Comment, (comment) => comment.parentComment)
  childComments: Comment[];

  @OneToMany(() => CommentRating, (commentRating) => commentRating.comment)
  commentRatings: CommentRating[];

  @OneToMany(() => Notification, (notification) => notification.contextComment)
  notifications: Notification[];
}
