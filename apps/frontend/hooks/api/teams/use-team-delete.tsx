import { useQueryClient, useMutation } from 'react-query';
import { deleteTeam } from 'services/api/teams';

export const useTeamDelete = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteTeam, {
    onSuccess: () => {
      queryClient.invalidateQueries('teams');
    },
  });
};
