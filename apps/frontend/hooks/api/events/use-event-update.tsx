import { Prisma } from '@prisma/client';
import { useMutation, useQueryClient } from 'react-query';
import { updateEvent } from 'services/api/events';

export const useEventUpdate = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation((data: Prisma.EventUpdateInput) => updateEvent(id, data), {
    onSuccess: (newEvent) => {
      queryClient.invalidateQueries(['event']);
      queryClient.invalidateQueries(['events']);
    },
  });
};
