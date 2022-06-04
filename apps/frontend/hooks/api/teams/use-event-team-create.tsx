import { useMutation, useQueryClient } from 'react-query';
import { createEventTeam } from 'services/api/event-team';

export const useEventTeamCreate = () => {
  const queryClient = useQueryClient();

  return useMutation(createEventTeam, {
    onSuccess: () => {
      queryClient.invalidateQueries('teams');
      // TODO: ['event', eventId] ?
    },
  });
};
