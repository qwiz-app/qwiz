import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { AWSService } from 'resources/aws/aws.service';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';

@Module({
  controllers: [PdfController],
  providers: [PdfService, PrismaService, AWSService],
})
export class PdfModule {}
