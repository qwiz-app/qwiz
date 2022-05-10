import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma.service';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.QuizUncheckedCreateInput) {
    return this.prisma.quiz.create({ data });
  }

  findAll(where: Prisma.QuizWhereInput, include: Prisma.QuizInclude) {
    return this.prisma.quiz.findMany({
      where,
      include,
      orderBy: {
        updatedAt: 'desc',
      },
    });
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

  async remove(where: Prisma.QuizWhereInput) {
    try {
      return await this.prisma.quiz.deleteMany({ where });
    } catch (err) {
      throw new NotFoundException(err?.meta?.cause || 'Something went wrong.');
    }
  }
}
