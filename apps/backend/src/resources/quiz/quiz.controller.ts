import {
  Body,
  Controller, Delete,
  Get,
  NotFoundException,
  Param, Patch,
  Post
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
  // does not need to include user because we have it in session
  @Get()
  findAll() {
    const include: Prisma.QuizInclude = {
      owner: {
        include: {
          user: true,
        },
      },
      _count: true,
    };
    return this.quizService.findAll(include);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const include: Prisma.QuizInclude = {
      owner: {
        include: {
          user: true,
        },
      },
      _count: true,
    };
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
