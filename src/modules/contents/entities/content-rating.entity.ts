import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Rating } from '@/shared/entities/rating.entity';
import { User } from '@/modules/users/user.entity';
import { Content } from '@/modules/contents/entities/content.entity';

@Entity('content_ratings')
export class ContentRating extends Rating {
  @ManyToOne(() => User, (user) => user.contentRatings)
  @JoinColumn({ name: 'creator_id' })
  creator: User | null;

  @ManyToOne(() => Content, (content) => content.contentRatings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'content_id' })
  content: Content | null;
}
