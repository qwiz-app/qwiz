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
import { Organization, Prisma } from '@prisma/client';
import { OrganizationEntity } from 'common/decorators/organization.decorator';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  create(
    @Body() createQuizDto: Prisma.QuizCreateWithoutOwnerInput,
    @OrganizationEntity() organization: Organization
  ) {
    return this.quizService.create({
      ...createQuizDto,
      ownerId: organization.id,
    });
  }

  // TODO: only for admin
  // TODO: different endpoint for our own quizzes or for quiz by organization
  @Get()
  findAll(
    @Query('owner', new DefaultValuePipe(false), ParseBoolPipe) owner: boolean,
    @Query('count', new DefaultValuePipe(false), ParseBoolPipe) _count: boolean
  ) {
    const include = { owner, _count };
    return this.quizService.findAll(include);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('owner', new DefaultValuePipe(true), ParseBoolPipe) owner: boolean,
    @Query('count', new DefaultValuePipe(true), ParseBoolPipe) _count: boolean
  ) {
    const include = { owner, _count };
    const quiz = await this.quizService.findOne({ id }, include);

    if (!quiz) {
      throw new NotFoundException('Quiz not found.');
    }
    return quiz;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuizDto: Prisma.QuizUncheckedUpdateWithoutOwnerInput,
    @OrganizationEntity() organization: Organization
  ) {
    return this.quizService.update(
      { id },
      { ...updateQuizDto, ownerId: organization.id }
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.quizService.remove({ id });
    } catch (err) {
      throw new NotFoundException(err?.meta?.cause || 'Something went wrong.');
    }
  }
}
