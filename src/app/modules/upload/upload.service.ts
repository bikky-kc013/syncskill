import { Injectable } from '@nestjs/common';
import { Express } from 'express';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {}
  s3 = new S3({
    region: this.configService.get<string>('AWS_S3_REGION'),
    accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
    secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
  });
  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    try {
      const uploadResult = await this.s3
        .upload({
          Bucket: this.configService.get<string>('S3_BUCKET'),
          Body: dataBuffer,
          Key: filename,
          ACL: 'public-read',
          ContentDisposition: 'inline',
        })
        .promise();
      return uploadResult;
    } catch (error) {
      throw error;
    }
  }
  async deletePublicFile(fileKey: string) {
    try {
      const deletedFile = await this.s3
        .deleteObject({
          Bucket: this.configService.get<string>('S3_BUCKET'),
          Key: fileKey,
        })
        .promise();

      return deletedFile;
    } catch (error) {
      console.log(error);
    }
  }
}
