import { showNotification } from '@mantine/notifications';
import router from 'next/router';
import { paths } from 'paths';
import { useQuizzes } from './api/quiz';
import { useCurrentUser } from './api/users';

export const useCreateEventCheck = () => {
  const { isOrganization } = useCurrentUser();
  const { data: quizzes, isPlaceholderData } = useQuizzes(isOrganization);

  const hasQuizzes = quizzes?.length > 0 && !isPlaceholderData;

  const showNoQuizzesNotification = () => {
    showNotification({
      title: 'No quizzes yet',
      message: 'Create a quiz first to get started with events',
      color: 'orange',
    });
  };

  const navigateToCreateEvent = () => {
    if (!hasQuizzes) {
      showNoQuizzesNotification();
    } else {
      router.push(paths.eventCreate());
    }
  };

  return {
    navigateToCreateEvent,
  };
};
