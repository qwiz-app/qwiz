import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma.service';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.EventUncheckedCreateInput) {
    return this.prisma.event.create({ data });
  }

  findAll(include: Prisma.EventInclude) {
    return this.prisma.event.findMany({ include });
  }

  findOne(
    where: Prisma.EventWhereUniqueInput,
    include: Prisma.EventInclude = {}
  ) {
    return this.prisma.event.findUnique({
      where,
      include,
    });
  }

  update(
    where: Prisma.EventWhereUniqueInput,
    data: Prisma.EventUncheckedUpdateInput
  ) {
    return this.prisma.event.update({
      where,
      data,
    });
  }

  async remove(where: Prisma.EventWhereUniqueInput) {
    try {
      return await this.prisma.event.delete({ where });
    } catch (err) {
      throw new NotFoundException(err?.meta?.cause || 'Something went wrong.');
    }
  }
}
