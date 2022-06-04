import { showNotification } from '@mantine/notifications';
import { useTeams } from './api/teams';

export const useApplyToEventCheck = () => {
  const { data: teams } = useTeams();

  const hasTeams = teams?.length > 0;

  const showNoQuizzesNotification = () => {
    showNotification({
      title: 'No teams available',
      message: 'Create a team to apply to events',
      color: 'orange',
    });
  };

  const navigateToTeamCreate = () => {
    if (!hasTeams) {
      showNoQuizzesNotification();
    }
  };

  return {
    navigateToTeamCreate,
    hasTeams,
  };
};
