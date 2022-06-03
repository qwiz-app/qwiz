import { onError } from 'lib/axios';
import { useQuery } from 'react-query';
import { fetchTeam } from 'services/api/teams';

export const useTeam = (id: string) =>
  useQuery(['team', id], ({ queryKey }) => fetchTeam(queryKey[1]), {
    onError,
    enabled: !!id,
  });
