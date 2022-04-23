import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({ where });
  }

  update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({ where, data });
  }

  async remove(where: Prisma.UserWhereUniqueInput) {
    try {
      return await this.prisma.user.delete({ where });
    } catch (err) {
      throw new NotFoundException(err?.meta?.cause || 'Something went wrong.');
    }
  }

  assignRoleAndCreateOrganization(
    where: Prisma.UserWhereUniqueInput,
    create: Prisma.OrganizationCreateInput
  ) {
    return this.prisma.user.update({
      where,
      data: {
        role: Role.ORGANIZER,
        organization: { create },
      },
    });
  }

  assignRoleAndCreateAttendee(
    where: Prisma.UserWhereUniqueInput,
    create: Prisma.AttendeeCreateInput
  ) {
    return this.prisma.user.update({
      where,
      data: {
        role: Role.ATTENDEE,
        attendee: { create },
      },
    });
  }
}
