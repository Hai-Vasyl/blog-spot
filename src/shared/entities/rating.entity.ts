import { Base } from '@/shared/entities/base.entity';
import { Prop } from '@nestjs/mongoose';

export class Rating extends Base {
  @Prop({ type: Boolean })
  state: boolean;
}
