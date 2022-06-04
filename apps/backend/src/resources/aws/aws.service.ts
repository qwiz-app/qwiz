import { Injectable } from '@nestjs/common';
import sha1 from 'sha1';
import { getBrowserInstance } from 'lib/pupeteer';
import S3 from 'aws-sdk/clients/s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AWSService {
  constructor(private configService: ConfigService) {}

  s3 = new S3({
    region: this.configService.get<string>('AWS_BUCKET_REGION'),
    accessKeyId: this.configService.get<string>('AWS_BUCKET_ACCESS_KEY'),
    secretAccessKey: this.configService.get<string>('AWS_BUCKET_SECRET_KEY'),
    signatureVersion: 'v4',
  });

  async upload(name: string, type: string) {
    const fileParams = {
      Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
      Key: name,
      Expires: 600,
      ContentType: type,
    };

    const url = await this.s3.getSignedUrlPromise('putObject', fileParams);

    return { url };
  }

  async createThumbnail(
    url: string,
    size: {
      width: number;
      height: number;
    }
  ) {
    let browser = null;

    browser = await getBrowserInstance(size);
    const page = await browser.newPage();
    await page.goto(url);
    const imageBuffer = await page.screenshot();

    const salt = new Date().getTime();

    const fileName = sha1(salt);

    const params = {
      Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
      Key: fileName,
      Body: imageBuffer,
      ContentType: 'image/jpeg',
    };

    this.s3.upload(params, (err) => {
      if (err) {
        throw new Error(err);
      }
    });

    const s3url = {
      url: `${this.configService.get<string>('AWS_BUCKET_URL')}${fileName}`,
    };

    return s3url;
  }

  async createPdf(url: string) {
    let browser = null;

    browser = await getBrowserInstance();
    const page = await browser.newPage();
    await page.emulateMediaType('screen'); 
    await page.addStyleTag({
      content: '@page { size: auto; height: auto; }',
    });
    await page.goto(url);
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      landscape: true,
    });

    const salt = new Date().getTime();

    const fileName = sha1(salt);

    const params = {
      Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
      Key: fileName,
      Body: pdfBuffer,
      ContentType: 'application/pdf',
    };

    this.s3.upload(params, (err) => {
      if (err) {
        throw new Error(err);
      }
    });

    const s3url = {
      url: `${this.configService.get<string>('AWS_BUCKET_URL')}${fileName}`,
    };

    return s3url;
  }
}
