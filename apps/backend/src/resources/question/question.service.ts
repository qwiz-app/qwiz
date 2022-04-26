import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma.service';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.QuestionUncheckedCreateInput) {
    return this.prisma.question.create({ data });
  }

  findAvailable(
    where: Prisma.QuestionWhereInput,
    include: Prisma.QuestionInclude
  ) {
    return this.prisma.question.findMany({ where, include });
  }

  findAll(where: Prisma.QuestionWhereInput, include: Prisma.QuestionInclude) {
    return this.prisma.question.findMany({ where, include });
  }

  findOne(
    where: Prisma.QuestionWhereUniqueInput & Prisma.QuestionWhereInput,
    include: Prisma.QuestionInclude
  ) {
    return this.prisma.question.findFirst({ where, include });
  }

  update(
    where: Prisma.QuestionWhereUniqueInput & Prisma.QuestionWhereInput,
    data: Prisma.QuestionUpdateInput
  ) {
    return this.prisma.question.updateMany({
      where,
      data,
    });
  }

  async remove(
    where: Prisma.QuestionWhereUniqueInput & Prisma.QuestionWhereInput
  ) {
    try {
      return await this.prisma.question.deleteMany({ where });
    } catch (err) {
      throw new NotFoundException(err?.meta?.cause || 'Something went wrong.');
    }
  }
}
