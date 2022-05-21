import { useMutation, useQueryClient } from 'react-query';
import { deleteEvent } from 'services/api/events';
import { EventWithOwner } from 'types/api/event';

export const useEventDelete = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation(() => deleteEvent(id), {
    onMutate: async () => {
      await queryClient.cancelQueries(['events']);

      const previousEvents = queryClient.getQueryData(
        'events'
      ) as EventWithOwner[];

      queryClient.setQueryData(
        'events',
        previousEvents?.filter((event) => event.id !== id)
      );

      return { previousEvents };
    },
    onError(err, variables, context: { previousEvents: EventWithOwner[] }) {
      if (context?.previousEvents) {
        queryClient.setQueryData<EventWithOwner[]>(
          'events',
          context.previousEvents
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('events');
    },
  });
};
