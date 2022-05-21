import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.QuestionCategoryCreateInput) {
    return this.prisma.questionCategory.create({ data });
  }

  createMany(data: Prisma.QuestionCategoryCreateManyInput) {
    return this.prisma.questionCategory.createMany({ data });
  }

  findAll() {
    return this.prisma.questionCategory.findMany();
  }

  findOne(where: Prisma.QuestionCategoryWhereUniqueInput) {
    return this.prisma.questionCategory.findUnique({ where });
  }

  update(
    where: Prisma.QuestionCategoryWhereUniqueInput,
    data: Prisma.QuestionCategoryUncheckedUpdateInput
  ) {
    return this.prisma.questionCategory.update({
      where,
      data,
    });
  }

  remove(where: Prisma.QuestionCategoryWhereUniqueInput) {
    return this.prisma.questionCategory.delete({ where });
  }
}
