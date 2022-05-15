import { onError } from 'lib/axios';
import { generateArrayForRange } from 'lib/utils';
import { useQuery } from 'react-query';
import { fetchAllEvents, fetchEvents } from 'services/api/events';
import { EventWithOrganization } from 'types/event';

export const useAllEvents = () =>
  useQuery('events', fetchAllEvents, {
    onError,
    placeholderData: placeholderEvents,
  });

export const useEvents = () =>
  useQuery('events', fetchEvents, {
    onError,
    placeholderData: placeholderEvents,
  });

//   TODO: using placholer data isnt reusable when adding changing backend
const placeholderEvents: EventWithOrganization[] = generateArrayForRange(4).map(
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
