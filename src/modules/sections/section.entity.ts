import { Column, Entity, ManyToOne } from 'typeorm';

import { Base } from '@/shared/entities/base.entity';
import { Content } from '@/modules/contents/entities/content.entity';
import { User } from '@/modules/users/user.entity';
import { AccessTypeEnum } from '@/shared/enums/access-type.enum';

@Entity('section')
export class Section extends Base {
  @Column({ type: 'varchar', nullable: true })
  title: string;

  @Column({ type: 'text' })
  body: string;

  @Column({
    type: 'enum',
    enum: AccessTypeEnum,
    default: AccessTypeEnum.PUBLIC,
  })
  accessType: string;

  @ManyToOne(() => Content, (content) => content.sections)
  content: Content;

  @ManyToOne(() => User, (user) => user.userSections)
  creator: User;
}
