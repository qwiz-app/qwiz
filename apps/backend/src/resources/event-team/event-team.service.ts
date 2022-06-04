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

  async remove(where: Prisma.EventTeamWhereInput) {
    try {
      return await this.prisma.eventTeam.deleteMany({ where });
    } catch (err) {
      throw new NotFoundException(err?.meta?.cause || 'Something went wrong.');
    }
  }
}
