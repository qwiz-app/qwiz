import { Alert, Button, Stack } from '@mantine/core';
import { useQuizCreate } from 'hooks/api/quiz';
import { useAppColorscheme } from 'hooks/colorscheme';
import router from 'next/router';
import { paths } from 'paths';

export const NoQuizzesAlert = () => {
  const { isDark } = useAppColorscheme();

  const { mutate: createQuiz, isLoading: isCreateLoading } = useQuizCreate();

  const handleCreateQuiz = () => {
    createQuiz(
      {},
      {
        // TODO: create new slide by default
        onSuccess: (quiz) => router.push(paths.quizEdit(quiz.id)),
      }
    );
  };

  return (
    <Alert
      title="No quizzes yet"
      color={isDark ? 'gray' : 'dark'}
      sx={(t) => ({
        maxWidth: 500,
        backgroundColor: !isDark && t.colors.gray[2],
      })}
    >
      <Stack align="start">
        Choose any of the templates above or start blank 👩‍🎨️
        <Button
          color="indigo"
          variant={isDark ? 'light' : 'filled'}
          onClick={handleCreateQuiz}
          loading={isCreateLoading}
        >
          Create your first quiz
        </Button>
      </Stack>
    </Alert>
  );
};
