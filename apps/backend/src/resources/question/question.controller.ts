import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(@Body() createQuestionDto: Prisma.QuestionCreateInput) {
    return this.questionService.create(createQuestionDto);
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const question = await this.questionService.findOne({ id });
    if (!question) {
      throw new NotFoundException('Question does not exist.');
    }
    return question;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: Prisma.QuestionUpdateInput
  ) {
    console.log('updateQuestionDto', updateQuestionDto);
    return this.questionService.update({ id }, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove({ id });
  }
}
