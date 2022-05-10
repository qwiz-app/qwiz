import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma.service';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.EventUncheckedCreateInput) {
    return this.prisma.event.create({ data });
  }

  findAll(where: Prisma.EventWhereInput, include: Prisma.EventInclude) {
    return this.prisma.event.findMany({
      where,
      include,
      orderBy: {
        startDate: 'asc',
      },
    });
  }

  findOne(where: Prisma.EventWhereUniqueInput, include: Prisma.EventInclude) {
    return this.prisma.event.findUnique({ where, include });
  }

  update(
    where: Prisma.EventWhereInput,
    data: Prisma.EventUncheckedUpdateInput
  ) {
    return this.prisma.event.updateMany({ where, data });
  }

  async remove(where: Prisma.EventWhereInput) {
    try {
      return await this.prisma.event.deleteMany({ where });
    } catch (err) {
      throw new NotFoundException(err?.meta?.cause || 'Something went wrong.');
    }
  }
}
