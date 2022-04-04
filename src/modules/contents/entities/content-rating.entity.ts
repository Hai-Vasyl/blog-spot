import { Entity, ManyToOne } from 'typeorm';

import { Content } from '@/modules/contents/entities/content.entity';
import { User } from '@/modules/users/user.entity';
import { Rating } from '@/shared/entities/rating.entity';

@Entity('content-rating')
export class ContentRating extends Rating {
  @ManyToOne(() => User, (user) => user.userContentRatings)
  user: User;

  @ManyToOne(() => Content, (content) => content.contentRatings)
  content: Content;
}
