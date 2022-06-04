import { useQuery } from 'react-query';
import { fetchTeams } from 'services/api/teams';

export const useTeams = (isUser = true) =>
  useQuery('teams', fetchTeams, {
    enabled: isUser,
  });
