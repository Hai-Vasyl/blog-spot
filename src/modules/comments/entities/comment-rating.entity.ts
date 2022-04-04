import { Entity, ManyToOne } from 'typeorm';

import { User } from '@/modules/users/user.entity';
import { Comment } from '@/modules/comments/entities/comment.entity';
import { Rating } from '@/shared/entities/rating.entity';

@Entity('comment-rating')
export class CommentRating extends Rating {
  @ManyToOne(() => User, (user) => user.userCommentRatings)
  user: User;

  @ManyToOne(() => Comment, (content) => content.commentRatings)
  comment: Comment;
}
