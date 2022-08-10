import { AccessTypeEnum } from '@/shared/enums/access-type.enum';
import { IsEnum, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateFileRequestDTO {
  @MaxLength(100, {
    message: 'Field "title" must be no more than 100 characters',
  })
  @IsNotEmpty({
    message: 'Field "title" cannot be empty',
  })
  title: string;

  @MaxLength(300, {
    message: 'Field "description" must be no more than 300 characters',
  })
  @IsOptional()
  description: string;

  @IsOptional()
  @IsEnum(AccessTypeEnum, {
    message: 'Field "access type" is invalid',
  })
  accessType?: AccessTypeEnum;

  tags: number[];

  @IsNotEmpty({
    message: 'Field "category" cannot be empty',
  })
  category: number;

  // @I
  // file: Express.Multer.File
}
