import {
  ActionIcon,
  AppShell,
  Avatar,
  Grid,
  Group,
  Header,
  Navbar,
  Skeleton,
  Title
} from '@mantine/core';
import { Slides } from 'components/Quiz/Slides';
import { FloatingQuizMenu } from 'components/UI/FloatingQuizMenu';
import { useQuiz } from 'hooks/api/quiz';
import { useCurrentSession } from 'hooks/api/session';
import { useAppColorscheme } from 'hooks/colorscheme';
import { useRouter } from 'next/router';
import { CaretLeft } from 'phosphor-react';
import { ReactNode } from 'react';

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
      fixed
      sx={() => ({ height: '100vh' })}
      navbar={
        <Navbar fixed width={{ base: 220 }}>
          <Slides />
        </Navbar>
      }
      header={
        <Header height={60} p="sm" fixed>
          <Group
            align="center"
            position="apart"
            sx={(t) => ({ width: '100%', height: '100%' })}
          >
            <Grid sx={{ width: '100%' }}>
              <Grid.Col span={3}>
                <ActionIcon onClick={() => router.push('/quiz')}>
                  <CaretLeft size={24} weight="duotone" />
                </ActionIcon>
              </Grid.Col>
              <Grid.Col
                span={6}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Title order={5} m={0}>
                  {quiz?.name}
                </Title>
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
                  height={30}
                  sx={() => ({ flexShrink: 0 })}
                >
                  {!isLoading && (
                    <Avatar src={user?.image} size={30} radius="xl" />
                  )}
                </Skeleton>
              </Grid.Col>
            </Grid>
          </Group>
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
      <FloatingQuizMenu />
    </AppShell>
  );
};

export default QuizLayout;
