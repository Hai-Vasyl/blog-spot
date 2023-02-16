import { Comment } from '@/modules/comments/entities/comment.entity';
import { Content } from '@/modules/contents/entities/content.entity';
import { File } from '@/modules/files/file.entity';
import { ContextTypeEnum } from '@/modules/notifications/enums/context-type.enum';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Base } from '../../shared/entities/base.entity';

@Entity('notifications')
export class Notification extends Base {
  @Column({ type: 'boolean', default: false, name: 'is_read' })
  isRead: boolean;

  @Column({ type: 'varchar', nullable: false, length: 150 })
  body: string;

  @Column({
    type: 'enum',
    enum: ContextTypeEnum,
    nullable: false,
    name: 'context_type',
  })
  contextType: ContextTypeEnum;

  @ManyToOne(() => File, (file) => file.notifications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'context_id' })
  contextFile: File | null;

  @ManyToOne(() => Content, (content) => content.notifications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'context_id' })
  contextContent: Content | null;

  @ManyToOne(() => Comment, (comment) => comment.notifications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'context_id' })
  contextComment: Comment | null;
}
