import { onError } from 'lib/axios';
import { useQuery } from 'react-query';
import {
  fetchAttendee,
  fetchAttendees,
  fetchCurrentAttendee,
} from 'services/api/attendees';

export const useAttendees = () =>
  useQuery(['attendees'], fetchAttendees, {
    onError,
  });

export const useAttendee = (id: string) =>
  useQuery(['attendee', id], ({ queryKey }) => fetchAttendee(queryKey[1]), {
    onError,
    enabled: !!id,
  });

export const useCurrentAttendeeInfo = () =>
  useQuery(['currentAttendees'], fetchCurrentAttendee, {
    onError,
  });
