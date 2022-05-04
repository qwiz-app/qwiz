import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma.service';

@Injectable()
export class OrganizationService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.OrganizationUncheckedCreateInput) {
    return this.prisma.organization.create({ data });
  }

  findAll(include: Prisma.OrganizationInclude) {
    return this.prisma.organization.findMany({ include });
  }

  findOne(
    where: Prisma.OrganizationWhereUniqueInput,
    include: Prisma.OrganizationInclude
  ) {
    return this.prisma.organization.findUnique({
      where,
      include,
    });
  }

  update(
    where: Prisma.OrganizationWhereUniqueInput,
    data: Prisma.OrganizationUncheckedUpdateInput
  ) {
    return this.prisma.organization.update({
      where,
      data,
    });
  }

  async remove(where: Prisma.OrganizationWhereUniqueInput) {
    try {

      return await this.prisma.organization.delete({ where });
    } catch (err) {
      throw new NotFoundException(err?.meta?.cause || 'Something went wrong.');
    }
  }
}
