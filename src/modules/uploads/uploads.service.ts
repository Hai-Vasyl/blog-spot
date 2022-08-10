import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import * as sharp from 'sharp';

import { ExceptionTypeMessageEnum } from '@/shared/enums/exception-type-message.enum';
import { Upload } from '@/modules/uploads/upload.entity';
import { CreateFileRequestDTO } from '@/modules/uploads/dto/create-file-request.dto';
import { validateDto } from '@/shared/helpers/validate-dto';

@Injectable()
export class UploadsService {
  private readonly awsParams: any;
  private readonly s3Client: S3Client;
  private readonly putBucketParams;
  private readonly deleteBucketParams;

  constructor(private readonly configService: ConfigService) {
    this.awsParams = {
      region: configService.get('aws.region'),
      Bucket: configService.get('aws.bucket'),
      accessKeyId: configService.get('aws.id'),
      secretAccessKey: configService.get('aws.secret'),
    };
    const { region, accessKeyId, secretAccessKey, Bucket } = this.awsParams;

    this.s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const bucketParams = {
      Bucket,
      Key: '',
      ACL: 'public-read',
      Conditions: [{ acl: 'public-read' }],
    };
    this.putBucketParams = {
      ...bucketParams,
      Body: '',
    };
    this.deleteBucketParams = {
      ...bucketParams,
    };
  }

  private async minifyImage(buffer: Buffer, quality: number): Promise<Buffer> {
    try {
      return sharp(buffer).webp({ quality }).toBuffer();
    } catch (error) {
      throw new UnprocessableEntityException({
        type: ExceptionTypeMessageEnum.NOTIFICATION,
        message: error.message,
      });
    }
  }

  private getKeyFile(filename: string): string {
    return uuidv4() + filename;
  }

  private async sendRequest(
    objectCommand: PutObjectCommand | DeleteObjectCommand,
  ): Promise<any> {
    try {
      return await this.s3Client.send(objectCommand);
    } catch (error) {
      throw new UnprocessableEntityException({
        type: ExceptionTypeMessageEnum.NOTIFICATION,
        message: error.message,
      });
    }
  }

  private getUrlString(key: string): string {
    const { region, Bucket } = this.awsParams;

    return `https://${Bucket}.s3.${region}.amazonaws.com/${key}`;
  }

  public async removeFile(key: string): Promise<any> {
    this.deleteBucketParams.Key = key;

    return this.sendRequest(new DeleteObjectCommand(this.deleteBucketParams));
  }

  public async uploadFile(file: Express.Multer.File): Promise<any> {
    let buffer: Buffer;

    if (file.mimetype.split('/')[0] === 'image') {
      buffer = await this.minifyImage(file.buffer, 40);
    } else {
      buffer = file.buffer;
    }

    const key = this.getKeyFile(file.originalname);

    this.putBucketParams.Key = key;
    this.putBucketParams.Body = buffer;

    await this.sendRequest(new PutObjectCommand(this.putBucketParams));

    return {
      key,
      url: this.getUrlString(key),
    };
  }

  public async createFile(
    userId: string,
    file: Express.Multer.File,
    dto: CreateFileRequestDTO,
  ) {
    // console.log(JSON.stringify({ dto }, null, 2));
    await validateDto(CreateFileRequestDTO, dto);

    const { mimetype } = file;
    const { title, description, accessType, tags, category } = dto;

    // const { key: name, url } = await this.uploadFile(file);

    // const upload = new Upload();
    // Object.assign(upload, {
    //   title,
    //   description,
    //   accessType,
    //   name,
    //   url,
    //   mimetype,
    // });
  }
}
