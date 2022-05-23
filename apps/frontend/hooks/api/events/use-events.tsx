import { onError } from 'lib/axios';
import { generateArrayForRange } from 'lib/utils';
import { useQuery, useQueryClient } from 'react-query';
import {
  fetchAllEvents,
  fetchEvents,
  fetchEventsByOrganization,
} from 'services/api/events';
import { EventWithOwner } from 'types/api/event';

export const useAllEvents = () =>
  useQuery('allEvents', fetchAllEvents, {
    onError,
    placeholderData,
  });

export const useEvents = () =>
  useQuery('events', fetchEvents, {
    onError,
    placeholderData,
});

export const useEventsByOrganization = (orgId: string) => {
  const queryClient = useQueryClient();

  return useQuery(['events', orgId], () => fetchEventsByOrganization(id), {
    onError,
    enabled: !!orgId,
    placeholderData,
    initialData: () => {
      const cachedEvents = queryClient.getQueryData([
        'events',
      ]) as EventWithOwner[];
      return cachedEvents.filter((event) => event.ownerId === orgId);
    },
  });
};

//   TODO: using placholer data isnt reusable when adding changing backend
const placeholderData: EventWithOwner[] = generateArrayForRange(4).map(
  (_, idx) => ({
    id: `${idx}`,
    name: '',
    banner: null,
    description: '',
    ownerId: '',
    quizId: '',
    startDate: new Date(),
    location: '',
    price: 10,
    currency: 'USD',
    teamCount: 22,
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
  })
);
