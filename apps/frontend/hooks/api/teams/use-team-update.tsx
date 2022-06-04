import { Team } from '@prisma/client';
import { useMutation, useQueryClient } from 'react-query';
import { updateTeam } from 'services/api/teams';
import { TeamUpdate } from 'types/api/teams';

export const useTeamUpdate = (teamId: string) => {
  const queryClient = useQueryClient();

  return useMutation((data: TeamUpdate) => updateTeam(teamId, data), {
    onMutate: async (newTeam) => {
      await queryClient.cancelQueries(['team', teamId]);
      await queryClient.cancelQueries('teams');

      const previousTeams = queryClient.getQueryData('teams') as Team[];
      const previousTeamCache = queryClient.getQueryData([
        'team',
        teamId,
      ]) as Team;

      // Update single
      const previousTeam =
        previousTeamCache ?? previousTeams?.find((t) => t.id === teamId);
      const updatedTeam = { ...previousTeam, ...newTeam };

      // Update list
      const updatedTeams = previousTeams?.map((team) =>
        team.id !== teamId ? team : { ...team, ...newTeam }
      );

      queryClient.setQueryData(['team', teamId], updatedTeam);
      queryClient.setQueryData('teams', updatedTeams);

      return { previousTeam, previousTeams };
    },
    onError(
      err,
      variables,
      context: { previousTeam: Team; previousTeams: Team[] }
    ) {
      if (context?.previousTeam) {
        queryClient.setQueryData<Team>(['team', teamId], context.previousTeam);
      }
      if (context?.previousTeams) {
        queryClient.setQueryData<Team[]>('teams', context.previousTeams);
      }
    },
    onSettled: (newTeam) => {
      queryClient.invalidateQueries(['team', teamId]);
      queryClient.invalidateQueries('teams');
    },
  });
};
