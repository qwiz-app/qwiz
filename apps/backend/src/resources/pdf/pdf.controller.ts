import {
  Controller,
  Get,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { PdfService } from './pdf.service';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get(':id/:secret')
  findOne(@Param('id') id: string, @Param('secret') secret: string) {
    if (secret !== process.env.PUPPETEER_SECRET) {
      throw new UnauthorizedException('Wrong secret.');
    }
    return this.pdfService.findOne({
      id,
    });
  }
}
