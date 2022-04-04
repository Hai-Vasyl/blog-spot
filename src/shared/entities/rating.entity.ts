import { Column } from 'typeorm';

import { Base } from '@/shared/entities/base.entity';

export class Rating extends Base {
  @Column({ type: 'boolean' })
  state: boolean;
}
