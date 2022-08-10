import { EntityRepository, Repository } from 'typeorm';

import { Upload } from '@/modules/uploads/upload.entity';

@EntityRepository(Upload)
export class UploadRepository extends Repository<Upload> {}
