import { User } from '@/modules/users/user.entity';
import { Column, Entity, JoinTable, ManyToOne } from 'typeorm';

import { Base } from '../../shared/entities/base.entity';

@Entity('subscribers-publishers')
export class SubscriberPublisher extends Base {
  @Column({ type: 'boolean', name: 'is_muted', default: false })
  isMuted: boolean;

  @ManyToOne(() => User, (user) => user.subscribersPublishers, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'subscriber_id',
  })
  subscriber: User;

  @ManyToOne(() => User, (user) => user.publishersSubscribers, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'publisher_id',
  })
  publisher: User;

  // ---
}
