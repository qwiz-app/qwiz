import { Alert, Button, Stack } from '@mantine/core';
import { useAppColorscheme } from 'hooks/colorscheme';

export const NoQuizzesAlert = () => {
  const { isDark } = useAppColorscheme();

  return (
    <Alert
      title="No quizzes yet"
      color={isDark ? 'gray' : 'dark'}
      sx={(t) => ({
        maxWidth: '500px',
        backgroundColor: !isDark && t.colors.gray[2],
      })}
    >
      <Stack align="start">
        Choose any of the templates above or start blank 👩‍🎨️
        <Button color="indigo" variant={isDark ? 'light' : 'filled'}>
          Create your first quiz
        </Button>
      </Stack>
    </Alert>
  );
};

