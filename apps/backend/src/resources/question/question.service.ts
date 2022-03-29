import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma.service';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.QuestionCreateInput) {
    return this.prisma.question.create({ data });
  }

  findAll() {
    return this.prisma.question.findMany();
  }

  findOne(where: Prisma.QuestionWhereUniqueInput) {
    return this.prisma.question.findUnique({ where });
  }

  update(
    where: Prisma.QuestionWhereUniqueInput,
    data: Prisma.QuestionUpdateInput
  ) {
    // TODO: not working
    return this.prisma.question.update({
      where,
      data,
    });
  }

  remove(where: Prisma.QuestionWhereUniqueInput) {
    return this.prisma.question.delete({ where });
  }
}
