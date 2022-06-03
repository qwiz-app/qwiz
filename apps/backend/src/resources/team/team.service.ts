import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma.service';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.TeamUncheckedCreateInput, include: Prisma.TeamInclude) {
    return this.prisma.team.create({
      data,
      include,
    });
  }

  findAll(where: Prisma.TeamWhereInput, include: Prisma.TeamInclude) {
    return this.prisma.team.findMany({
      where,
      include,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(where: Prisma.TeamWhereUniqueInput, include: Prisma.TeamInclude) {
    return this.prisma.team.findUnique({
      where,
      include,
    });
  }

  update(
    where: Prisma.QuizWhereUniqueInput,
    data: Prisma.QuizUncheckedUpdateInput
  ) {
    return this.prisma.team.update({ where, data });
  }

  async remove(where: Prisma.QuizWhereInput) {
    try {
      return await this.prisma.team.deleteMany({ where });
    } catch (err) {
      throw new NotFoundException(err?.meta?.cause || 'Something went wrong.');
    }
  }
}
