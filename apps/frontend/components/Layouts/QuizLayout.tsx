import {
  AppShell,
  Navbar,
  Header,
  ActionIcon,
  Grid,
  Skeleton,
  Avatar,
} from '@mantine/core';
import { Slides } from 'components/Quiz/Slides';
import { ReactNode } from 'react';
import { useAppColorscheme } from 'hooks/colorscheme';
import { CaretLeft } from 'phosphor-react';
import { useRouter } from 'next/router';
import { useCurrentSession } from 'hooks/api/session';
import { useQuiz } from 'hooks/api/quiz';

interface Props {
  children: ReactNode;
}

const QuizLayout = ({ children }: Props) => {
  const { isDark } = useAppColorscheme();
  const router = useRouter();
  const { user, isLoading } = useCurrentSession();

  const { data: quiz } = useQuiz(router.query.quizId as string);

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 200 }}>
          <Slides />
        </Navbar>
      }
      header={
        <Header height={60} px="xs">
          <Grid align="center">
            <Grid.Col span={3}>
              <ActionIcon onClick={() => router.push('/quiz')}>
                <CaretLeft size={24} weight="light" />
              </ActionIcon>
            </Grid.Col>
            <Grid.Col
              span={6}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <h1>{quiz?.name}</h1>
            </Grid.Col>
            <Grid.Col
              span={3}
              sx={{
                display: 'flex',
                justifyContent: 'right',
              }}
            >
              <Skeleton
                visible={isLoading}
                circle
                height={24}
                sx={() => ({ flexShrink: 0 })}
              >
                {!isLoading && (
                  <Avatar src={user?.image} size={24} radius="xl" mr="xs" />
                )}
              </Skeleton>
            </Grid.Col>
          </Grid>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor: isDark ? theme.colors.dark[8] : theme.colors.gray[0],
          width: '100%',
        },
      })}
    >
      {children}
    </AppShell>
  );
};

export default QuizLayout;
