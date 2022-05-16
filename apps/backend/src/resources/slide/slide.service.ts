import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma.service';

@Injectable()
export class SlideService {
  constructor(private prisma: PrismaService) {}

  findOne(
    where: Prisma.QuizSlideWhereUniqueInput,
    include: Prisma.QuizSlideInclude
  ) {
    return this.prisma.quizSlide.findUnique({ where, include });
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
}
