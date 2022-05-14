import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
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
          },
        },
      }
    );
    if (!quiz) {
      throw new NotFoundException('Quiz not found.');
    }
    return quiz;
  }

  @Patch('point/:id')
  async updatePoint(
    @Param('id') id: string,
    @Body() updateQuizDto: Prisma.PointUpdateInput
  ) {
    return this.slideService.updatePoint({ id }, updateQuizDto);
  }
}
