import { useMutation, useQueryClient } from 'react-query';
import { deleteTeam } from 'services/api/teams';
import { TeamFull } from 'types/api/teams';

export const useTeamDelete = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation(() => deleteTeam(id), {
    onMutate: async () => {
      await queryClient.cancelQueries(['teams']);

      const previousTeams = queryClient.getQueryData('teams') as TeamFull[];

      queryClient.setQueryData(
        'teams',
        previousTeams.filter((team) => team.id !== id)
      );

      return { previousTeams };
    },
    onError(err, variables, context: { previousTeams: TeamFull[] }) {
      if (context?.previousTeams) {
        queryClient.setQueryData<TeamFull[]>('teams', context.previousTeams);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('teams');
    },
  });
};
