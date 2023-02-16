import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Rating } from '@/shared/entities/rating.entity';
import { User } from '@/modules/users/user.entity';
import { Comment } from '@/modules/comments/entities/comment.entity';

@Entity('comment_ratings')
export class CommentRating extends Rating {
  @ManyToOne(() => User, (user) => user.commentRatings)
  @JoinColumn({ name: 'creator_id' })
  creator: User | null;

  @ManyToOne(() => Comment, (comment) => comment.commentRatings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'comment_id' })
  comment: Comment | null;
}
