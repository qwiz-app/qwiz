import {
  Controller,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { SlideService } from './slide.service';

@Controller('slide')
export class SlideController {
  constructor(private readonly slideService: SlideService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const quiz = await this.slideService.findOne(
      { id },
      {
        elements: {
          include: {
            point: true,
            questionContent: true,
          }
        },
      }
    );
    if (!quiz) {
      throw new NotFoundException('Quiz not found.');
    }
    return quiz;
  }
}
