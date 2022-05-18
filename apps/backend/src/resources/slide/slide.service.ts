import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma.service';

@Injectable()
export class SlideService {
  constructor(private prisma: PrismaService) {}

  findAllForQuiz(
    where: Prisma.QuizSlideWhereInput,
    include: Prisma.QuizSlideInclude
  ) {
    return this.prisma.quizSlide.findMany({ where, include });
  }

  findOne(
    where: Prisma.QuizSlideWhereUniqueInput,
    include: Prisma.QuizSlideInclude
  ) {
    return this.prisma.quizSlide.findUnique({ where, include });
  }

  create(data: Prisma.QuizSlideUncheckedCreateInput) {
    return this.prisma.quizSlide.create({
      data,
    });
  }

  async remove(where: Prisma.QuizQuestionWhereUniqueInput) {
    try {
      return await this.prisma.quizSlide.delete({ where });
    } catch (err) {
      throw new NotFoundException(err?.meta?.cause || 'Something went wrong.');
    }
  }

  updatePoint(
    where: Prisma.PointWhereUniqueInput,
    data: Prisma.PointUpdateInput
  ) {
    return this.prisma.point.update({ where, data });
  }

  updateQuestionContent(
    where: Prisma.QuestionContentWhereUniqueInput,
    data: Prisma.QuestionContentUpdateInput
  ) {
    return this.prisma.questionContent.update({ where, data });
  }

  createQuestionContent(data: Prisma.QuestionContentCreateInput) {
    return this.prisma.questionContent.create({ data });
  }

  deleteQuestionContent(id: string) {
    return this.prisma.questionContent.delete({
      where: {
        id,
      },
    });
  }
}
