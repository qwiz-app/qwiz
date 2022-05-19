import { useMutation } from 'react-query';
import { createEvent } from 'services/api/events';

export const useEventCreate = () => {
  return useMutation('events', createEvent);
};
