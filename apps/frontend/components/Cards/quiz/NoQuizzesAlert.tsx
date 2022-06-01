import { Alert, Button, Stack } from '@mantine/core';
import { useAppColorscheme } from 'hooks/colorscheme';
import { useHandleCreateQuiz } from 'hooks/use-handle-create-quiz';

export const NoQuizzesAlert = () => {
  const { isDark } = useAppColorscheme();
  const { createQuiz, isLoading: isCreateLoading } = useHandleCreateQuiz();

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
          color="orange"
          variant={isDark ? 'light' : 'filled'}
          onClick={createQuiz}
          loading={isCreateLoading}
        >
          Create your first quiz
        </Button>
      </Stack>
    </Alert>
  );
};
