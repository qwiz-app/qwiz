import { useMutation, useQueryClient } from 'react-query';
import { assignRoleAndCreateAccount } from 'services/api/users';

export const useRoleAssignAndAccountCreate = () => {
  const queryClient = useQueryClient();

  return useMutation(assignRoleAndCreateAccount, {
    onSuccess: () => {
      queryClient.invalidateQueries('currentUser');
      queryClient.invalidateQueries('users');
    },
  });
};
