import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as AWS from 'aws-sdk';
import config from 'lib/config';
import sha1 from 'sha1';
import { getBrowserInstance } from 'lib/pupeteer';
import { PrismaService } from 'prisma.service';

const S3 = new AWS.S3({
  credentials: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretKey,
  },
});

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.QuizUncheckedCreateInput) {
    return this.prisma.quiz.create({ data });
  }

  findAll(where: Prisma.QuizWhereInput, include: Prisma.QuizInclude) {
    return this.prisma.quiz.findMany({ where, include });
  }

  findOne(where: Prisma.QuizWhereUniqueInput, include: Prisma.QuizInclude) {
    return this.prisma.quiz.findUnique({ where, include });
  }

  update(
    where: Prisma.QuizWhereUniqueInput,
    data: Prisma.QuizUncheckedUpdateInput
  ) {
    return this.prisma.quiz.update({ where, data });
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

    const fileName = sha1(`${salt}.jpg`);

    const params = {
      Bucket: config.aws.bucketName,
      Key: fileName,
      Body: imageBuffer,
      ContentType: 'image/jpeg',
    };

    S3.upload(params);

    const s3url = { url: `${config.aws.bucketUrl}${fileName}` };

    return s3url;
  }

  async remove(where: Prisma.QuizWhereInput) {
    try {
      return await this.prisma.quiz.deleteMany({ where });
    } catch (err) {
      throw new NotFoundException(err?.meta?.cause || 'Something went wrong.');
    }
  }
}
