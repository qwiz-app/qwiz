import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma.service';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.QuestionUncheckedCreateInput) {
    return this.prisma.question.create({ data });
  }

  findAvailable(where: Prisma.QuestionWhereInput) {
    return this.prisma.question.findMany({ where });
  }

  findAll(where: Prisma.QuestionWhereInput) {
    return this.prisma.question.findMany({ where });
  }

  findOne(
    where: Prisma.QuestionWhereUniqueInput,
    include: Prisma.QuestionInclude
  ) {
    return this.prisma.question.findUnique({ where, include });
  }

  update(
    where: Prisma.QuestionWhereUniqueInput,
    data: Prisma.QuestionUpdateInput
  ) {
    return this.prisma.question.update({
      where,
      data,
    });
  }

  async remove(where: Prisma.QuestionWhereUniqueInput) {
    try {
      return await this.prisma.question.delete({ where });
    } catch (err) {
      throw new NotFoundException(err?.meta?.cause || 'Something went wrong.');
    }
  }
}
