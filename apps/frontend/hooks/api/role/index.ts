import { useMutation } from 'react-query';
import { assignRoleAndCreateAccount } from 'services/api/users';
import { UserRoleReq } from 'types/role';

export const useRoleAssignAndAccountCreate = () =>
  useMutation((userRoleReq: UserRoleReq) =>
    assignRoleAndCreateAccount(userRoleReq)
  );
