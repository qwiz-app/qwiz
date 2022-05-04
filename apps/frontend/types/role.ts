import { Role, Prisma } from '@prisma/client';

export type UserRoleReq = {
  role: Role;
  data: Prisma.OrganizationCreateInput | Prisma.AttendeeCreateInput;
  image?: string;
};
