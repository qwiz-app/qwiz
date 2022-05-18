import {
  Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { QuizQuestionService } from './quiz-question.service';

@Controller('quiz-questions')
export class QuizQuestionController {
  constructor(private readonly quizQuestionService: QuizQuestionService) {}

  includeQuestion: Prisma.QuizQuestionInclude = {
    question: {
      include: {
        contents: true,
      },
    },
  };

  @Post()
  create(@Body() createQuizQuestionDto: Prisma.QuizQuestionCreateInput) {
    return this.quizQuestionService.create({ ...createQuizQuestionDto });
  }

  @Get('quiz/:quizId')
  findAllForQuiz(@Param('quizId') quizId: string) {
    const where = { quizId };
    const include = this.includeQuestion;

    return this.quizQuestionService.findAllForQuiz(where, include);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const include = this.includeQuestion;
    const question = await this.quizQuestionService.findOne({ id }, include);
    if (!question) {
      throw new NotFoundException('Quiz question does not exist.');
    }
    return question;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuizQuestionDto: Prisma.QuizQuestionUncheckedUpdateInput
  ) {
    return this.quizQuestionService.update({ id }, updateQuizQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizQuestionService.remove({ id });
  }
}
