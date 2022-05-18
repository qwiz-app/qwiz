import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma.service';

@Injectable()
export class QuizQuestionService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.QuizQuestionCreateInput) {
    return this.prisma.quizQuestion.create({
      data,
    });
  }

  findAllForQuiz(
    where: Prisma.QuizQuestionWhereInput,
    include: Prisma.QuizQuestionInclude
  ) {
    return this.prisma.quizQuestion.findMany({ where, include });
  }

  findOne(
    where: Prisma.QuizQuestionWhereUniqueInput,
    include: Prisma.QuizQuestionInclude
  ) {
    return this.prisma.quizQuestion.findUnique({ where, include });
  }

  update(
    where: Prisma.QuizQuestionWhereUniqueInput,
    data: Prisma.QuizQuestionUpdateInput
  ) {
    return this.prisma.quizQuestion.update({
      where,
      data,
    });
  }

  async remove(where: Prisma.QuizQuestionWhereUniqueInput) {
    try {
      return await this.prisma.quizQuestion.delete({ where });
    } catch (err) {
      throw new NotFoundException(err?.meta?.cause || 'Something went wrong.');
    }
  }
}
