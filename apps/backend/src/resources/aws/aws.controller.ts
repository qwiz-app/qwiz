import { Body, Controller, Post } from '@nestjs/common';
import { AWSService } from './aws.service';

@Controller('aws')
export class AWSController {
  constructor(private readonly awsService: AWSService) {}

  @Post('upload')
  upload(@Body() payload: { name: string; type: string }) {
    const { name, type } = payload;

    return this.awsService.upload(name, type);
  }

  @Post('thumbnail')
  createThumbnail(
    @Body()
    payload: {
      url: string;
      size: {
        width: number;
        height: number;
      };
    }
  ) {
    const { url, size } = payload;

    return this.awsService.createThumbnail(url, size);
  }

  @Post('pdf')
  createPdf(@Body() payload: { url: string;  }) {
    const { url } = payload;

    return this.awsService.createPdf(url);
  }
}
