import { Column, Entity, ManyToOne } from 'typeorm';

import { Base } from '@/shared/entities/base.entity';
import { User } from '@/modules/users/user.entity';
import { Category } from '@/modules/categories/category.entity';
import { AccessTypeEnum } from '@/shared/enums/access-type.enum';

@Entity('contents')
export class Content extends Base {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({
    type: 'varchar',
    enum: AccessTypeEnum,
    default: AccessTypeEnum.PUBLIC,
  })
  accessType: AccessTypeEnum;

  @Column({ type: Number, default: 0 })
  rating: number;

  @Column({ type: Number, default: 0 })
  comments: number;

  @Column({ type: 'varchar', nullable: false })
  color: string;

  @ManyToOne(() => User, (user) => user.contents)
  creator: User;

  @ManyToOne(() => Category, (category) => category.contents)
  category: Category;
}
