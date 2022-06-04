import { Prisma } from '@prisma/client';
import { useMutation, useQueryClient } from 'react-query';
import { createEventTeam } from 'services/api/event-team';

export const useEventTeamCreate = (eventId: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ teamId }: Prisma.EventTeamUncheckedCreateWithoutEventInput) =>
      createEventTeam({ teamId, eventId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('teams');
      },
    }
  );
};
