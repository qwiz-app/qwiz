import { useMutation, useQueryClient } from 'react-query';
import { createTeam } from 'services/api/teams';

export const useTeamCreate = () => {
  const queryClient = useQueryClient();

  return useMutation(createTeam, {
    onSuccess: () => {
      queryClient.invalidateQueries('teams');
    },
  });
};
