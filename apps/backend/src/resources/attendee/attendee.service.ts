import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma.service';

@Injectable()
export class AttendeeService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.AttendeeUncheckedCreateInput) {
    return this.prisma.attendee.create({ data });
  }

  findAll(include: Prisma.AttendeeInclude) {
    return this.prisma.attendee.findMany({ include });
  }

  findOne(
    where: Prisma.AttendeeWhereUniqueInput,
    include: Prisma.AttendeeInclude
  ) {
    return this.prisma.attendee.findUnique({
      where,
      include,
    });
  }

  update(
    where: Prisma.AttendeeWhereUniqueInput,
    data: Prisma.AttendeeUpdateInput
  ) {
    return this.prisma.attendee.update({
      where,
      data,
    });
  }

  async remove(where: Prisma.AttendeeWhereUniqueInput) {
    try {
      return await this.prisma.attendee.delete({ where });
    } catch (err) {
      throw new NotFoundException(err?.meta?.cause || 'Something went wrong.');
    }
  }
}
