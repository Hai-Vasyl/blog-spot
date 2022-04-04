import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { Base } from '@/shared/entities/base.entity';
import { User } from '@/modules/users/user.entity';
import { Upload } from '@/modules/uploads/upload.entity';
import { Content } from '@/modules/contents/entities/content.entity';

@Entity('category')
export class Category extends Base {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'varchar' })
  color: string;

  @ManyToOne(() => User, (user) => user.userCategories)
  creator: User;

  @ManyToOne(() => Upload, (upload) => upload.uploadCategories)
  preview: Upload;

  @OneToMany(() => Upload, (upload) => upload.category)
  categoryUploads: Upload[];

  @OneToMany(() => Content, (content) => content.category)
  categoryContents: Content[];
}
