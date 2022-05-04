import { Prisma, Role } from '@prisma/client';
import { useMutation } from 'react-query';
import { assignRoleAndCreateAccount } from 'services/api/users';

type UserDataForRole = {
  role: Role;
  data: Prisma.OrganizationCreateInput | Prisma.AttendeeCreateInput;
};

export const useRoleAssignAndAccountCreate = () =>
  useMutation(({ role, data }: UserDataForRole) =>
    assignRoleAndCreateAccount(role, data)
  );
