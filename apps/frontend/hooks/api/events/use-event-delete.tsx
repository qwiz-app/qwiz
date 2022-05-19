import { useMutation, useQueryClient } from 'react-query';
import { deleteEvent } from 'services/api/events';
import { EventWithOrganization } from 'types/event';

export const useEventDelete = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation(() => deleteEvent(id), {
    onMutate: async () => {
      await queryClient.cancelQueries(['events']);

      const previousEvents = queryClient.getQueryData(
        'events'
      ) as EventWithOrganization[];

      queryClient.setQueryData(
        'events',
        previousEvents?.filter((event) => event.id !== id)
      );

      return { previousEvents };
    },
    onError(
      err,
      variables,
      context: { previousEvents: EventWithOrganization[] }
    ) {
      if (context?.previousEvents) {
        queryClient.setQueryData<EventWithOrganization[]>(
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
