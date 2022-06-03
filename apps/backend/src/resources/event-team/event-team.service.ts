import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma.service';

@Injectable()
export class EventTeamService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.EventTeamUncheckedCreateInput) {
    return this.prisma.eventTeam.create({
      data,
    });
  }

  async remove(where: Prisma.EventTeamWhereUniqueInput) {
    try {
      return await this.prisma.eventTeam.delete({ where });
    } catch (err) {
      throw new NotFoundException(err?.meta?.cause || 'Something went wrong.');
    }
  }
}
