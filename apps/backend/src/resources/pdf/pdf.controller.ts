import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PdfService } from './pdf.service';

@Controller('pdf')
export class PdfController {
  constructor(
    private readonly pdfService: PdfService,
    private configService: ConfigService
  ) {}

  @Get(':id/:secret')
  findOne(@Param('id') id: string, @Param('secret') secret: string) {
    if (secret !== this.configService.get<string>('PUPPETEER_SECRET')) {
      throw new UnauthorizedException('Wrong secret.');
    }
    return this.pdfService.findOne({
      id,
    });
  }

  @Post('export')
  exportPdf(@Body() payload: { id: string }) {
    const { id } = payload;

    return this.pdfService.exportPdf(id);
  }
}
