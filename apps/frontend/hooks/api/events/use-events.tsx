import { useQuery } from 'react-query';
import { fetchAllEvents, fetchEvents } from 'services/api/events';

export const useAllEvents = () => useQuery('events', fetchAllEvents);

export const useEvents = () => useQuery('events', fetchEvents);
