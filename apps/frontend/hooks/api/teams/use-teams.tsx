import { useQuery } from 'react-query';
import { fetchTeams } from 'services/api/teams';
import { useCurrentUser } from '../users';

export const useTeams = (enabled = true) => {
  const { isUser } = useCurrentUser();

  return useQuery('teams', fetchTeams, {
    enabled: enabled && isUser,
  });
};
