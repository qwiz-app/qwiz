/* eslint-disable no-console */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma.service';
import { AWSService } from 'resources/aws/aws.service';
import sha1 from 'sha1';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { merge } from 'merge-pdf-buffers';

@Injectable()
export class PdfService {
  constructor(
    private prisma: PrismaService,
    private readonly awsService: AWSService,
    private configService: ConfigService
  ) {}

  findOne(where: Prisma.QuizSlideWhereUniqueInput) {
    return this.prisma.quizSlide.findUnique({
      where,
      include: {
        elements: true,
        quizQuestion: {
          include: {
            question: {
              include: {
                contents: true,
              },
            },
          },
        },
      },
    });
  }

  async exportPdf(id: string) {
    const quizWithSlides = await this.prisma.quiz.findUnique({
      where: {
        id,
      },
      include: {
        slides: true,
      },
    });

    const slideIds = quizWithSlides.slides.map((slide) => slide.id);

    const pdfUrls = slideIds.map((slideId) => {
      return this.awsService.createPdf(
        `${this.configService.get<string>('FRONTEND_URL')}/pdf/${slideId}`
      );
    });

    const pdfs = await Promise.all(pdfUrls);

    // eslint-disable-next-line no-promise-executor-return
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(500);

    const buffers = pdfs.map(async ({ url }) => {
      const buffer = await axios.get(url, {
        responseType: 'arraybuffer',
      });
      return Buffer.from(buffer.data);
    });

    const pdfBufferArr = await Promise.all(buffers);

    const mergedBuffer = await merge(pdfBufferArr);

    const salt = new Date().getTime();

    const fileName = sha1(salt);

    const params = {
      Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
      Key: fileName,
      Body: mergedBuffer,
      ContentType: 'application/pdf',
    };

    this.awsService.s3.upload(params, (err) => {
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
