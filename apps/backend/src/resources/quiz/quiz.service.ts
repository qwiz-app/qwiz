import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma.service';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.QuizUncheckedCreateInput) {
    return this.prisma.quiz.create({ data });
  }

  findAll(include: Prisma.QuizInclude) {
    return this.prisma.quiz.findMany({ include });
  }

  findOne(where: Prisma.QuizWhereUniqueInput, include: Prisma.QuizInclude) {
    return this.prisma.quiz.findUnique({ where, include });
  }

  update(
    where: Prisma.QuizWhereUniqueInput,
    data: Prisma.QuizUncheckedUpdateInput
  ) {
    return this.prisma.quiz.update({ where, data });
  }

  async remove(where: Prisma.QuizWhereUniqueInput) {
    try {
      return await this.prisma.quiz.delete({ where });
    } catch (err) {
      throw new NotFoundException(err?.meta?.cause || 'Something went wrong.');
    }
  }
}
