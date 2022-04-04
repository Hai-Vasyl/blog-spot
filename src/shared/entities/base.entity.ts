import { PrimaryGeneratedColumn } from 'typeorm';

import { Timestamp } from '@/shared/entities/timestamp.entity';

export class Base extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;
}
