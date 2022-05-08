import { Injectable } from '@nestjs/common';
import config from 'lib/config';
import sha1 from 'sha1';
import { getBrowserInstance } from 'lib/pupeteer';
import S3 from 'aws-sdk/clients/s3';

const s3 = new S3({
  region: config.aws.region,
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretKey,
  signatureVersion: 'v4',
});

@Injectable()
export class AWSService {
  async upload(name: string, type: string) {
    const fileParams = {
      Bucket: config.aws.bucketName,
      Key: name,
      Expires: 600,
      ContentType: type,
    };

    const url = await s3.getSignedUrlPromise('putObject', fileParams);

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
      Bucket: config.aws.bucketName,
      Key: fileName,
      Body: imageBuffer,
      ContentType: 'image/jpeg',
    };

    s3.upload(params, (err) => {
      if (err) {
        throw new Error(err);
      }
    });

    const s3url = { url: `${config.aws.bucketUrl}${fileName}` };

    return s3url;
  }
}
