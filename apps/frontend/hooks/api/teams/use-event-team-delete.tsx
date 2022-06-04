import { useMutation, useQueryClient } from 'react-query';
import { deleteEventTeam } from 'services/api/event-team';

// TODO: it deletes by event id instead of its own id, not ideal, but i'll have to do for now
export const useEventTeamDelete = (eventId: string) => {
  const queryClient = useQueryClient();

  return useMutation(() => deleteEventTeam(eventId), {
    onSuccess: () => {
      queryClient.invalidateQueries('teams');
    },
  });
};
