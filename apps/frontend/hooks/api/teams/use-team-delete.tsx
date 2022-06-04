import { useQueryClient, useMutation } from 'react-query';
import { deleteTeam } from 'services/api/teams';

export const useTeamDelete = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation(() => deleteTeam(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('teams');
    },
  });
};
