import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { SlideService } from './slide.service';

@Controller('slide')
export class SlideController {
  constructor(private readonly slideService: SlideService) {}

  @Get('quiz/:quizId')
  findAllForQuiz(@Param('quizId') quizId: string) {
    const include: Prisma.QuizSlideInclude = {
      elements: true,
      quiz: true,
    };
    const where = { quizId };

    return this.slideService.findAllForQuiz(where, include);
  }

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

  @Post()
  async create(@Body() createSlideDto: Prisma.QuizSlideUncheckedCreateInput) {
    return this.slideService.create(createSlideDto);
  }

  @Patch('point/:id')
  async updatePoint(
    @Param('id') id: string,
    @Body() updatePointDto: Prisma.PointUpdateInput
  ) {
    return this.slideService.updatePoint({ id }, updatePointDto);
  }

  @Patch('question-content/:id')
  async updateQuestionContent(
    @Param('id') id: string,
    @Body() updateQuestionContentDto: Prisma.QuestionContentUpdateInput
  ) {
    return this.slideService.updateQuestionContent(
      { id },
      updateQuestionContentDto
    );
  }

  @Post('question-content')
  async createQuestionContent(
    @Body() createQuestionContentDto: Prisma.QuestionContentCreateInput
  ) {
    return this.slideService.createQuestionContent(createQuestionContentDto);
  }

  @Delete('question-content/:id')
  async deleteQuestionContent(@Param('id') id: string) {
    return this.slideService.deleteQuestionContent(id);
  }
}
