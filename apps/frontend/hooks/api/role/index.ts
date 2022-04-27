import { Prisma, Role } from '@prisma/client';
import { queryOnError as onError } from 'lib/axios';
import { useQuery } from 'react-query';
import { assignRoleAndCreateAccount } from 'services/api/users';

export const useRoleAssignAndAccountCreate = (
  role: Role,
  data: Prisma.OrganizationCreateInput | Prisma.AttendeeCreateInput
) => {
  useQuery('assign-role', () => assignRoleAndCreateAccount(role, data), {
    onError,
  });
};
