import { useQuery } from 'react-query';
import { fetchTeams } from 'services/api/teams';

export const useTeams = () => useQuery('teams', fetchTeams);
