import { Base } from '@/shared/entities/base.entity';
import { Content } from '../contents/entities/content.entity';
import { User } from '../users/user.entity';
import { AccessTypeEnum } from '@/shared/enums/access-type.enum';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('bookmarks')
export class Bookmark extends Base {
  @Column({
    type: 'enum',
    enum: AccessTypeEnum,
    default: AccessTypeEnum.PUBLIC,
    name: 'access_type',
  })
  accessType: string;

  @ManyToOne(() => Content, (content) => content.bookmarks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'content_id' })
  content: Content | null;

  @ManyToOne(() => User, (user) => user.bookmarks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'creator_id' })
  creator: User | null;
}
