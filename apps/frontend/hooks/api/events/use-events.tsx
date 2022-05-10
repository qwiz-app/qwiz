import { useQuery } from 'react-query';

export const useAllEvents = () => useQuery('events', getAllEvents);

export const useEvents = () => useQuery('events', getEvents);
