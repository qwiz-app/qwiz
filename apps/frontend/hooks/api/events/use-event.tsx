import { onError } from 'lib/axios';
import { useQuery, useQueryClient } from 'react-query';
import { fetchEvent } from 'services/api/events';
import { EventWithOwner } from 'types/api/event';

export const useEvent = (id: string) => {
  const queryClient = useQueryClient();

  return useQuery(['event', id], ({ queryKey }) => fetchEvent(queryKey[1]), {
    onError,
    enabled: !!id,
    placeholderData,
    initialData: () => {
      const cachedEvents = queryClient.getQueryData(
        'events'
      ) as EventWithOwner[];
      return cachedEvents?.find((event) => event.id === id);
    },
  });
};

const placeholderData: EventWithOwner = {
  id: '',
  name: 'Placholder',
  banner: null,
  description: '',
  ownerId: '',
  quizId: '',
  startDate: new Date(),
  location: 'Sesvete',
  teamCount: 20,
  price: 5,
  currency: 'USD',
  createdAt: new Date(),
  owner: {
    id: '',
    name: '',
    userId: '',
    user: {
      id: '',
      name: '',
      email: '',
      emailVerified: null,
      image: '',
      role: 'ORGANIZATION',
    },
  },
};
