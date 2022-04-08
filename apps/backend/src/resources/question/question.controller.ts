import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseBoolPipe,
  Patch,
  Post,
  Query,
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

  // Global and active questions
  // option of including our custom questions
  @Get('')
  findAvailable(@Query('includeByOwner') ownerId: string) {
    // TODO: check if I am the owner organization of the question (user's organization from middleware) or admin
    // cant do it now cos postman isnt yet configured to handle middleware
    const where: Prisma.QuestionWhereInput = {
      isActive: true,
      OR: [{ isGlobal: true }, { ownerId }],
    };
    return this.questionService.findAvailable(where);
  }

  // TODO: only admin has access
  @Get('/all')
  findAll() {
    return this.questionService.findAll({});
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('owner', new DefaultValuePipe(false), ParseBoolPipe) owner: boolean
  ) {
    const question = await this.questionService.findOne({ id }, { owner });
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
    return this.questionService.update({ id }, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove({ id });
  }
}
