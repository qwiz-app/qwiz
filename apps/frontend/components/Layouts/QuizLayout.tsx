import {
  ActionIcon,
  AppShell,
  Avatar,
  FloatingTooltip,
  Grid,
  Group,
  Header,
  Navbar,
  Skeleton,
  Title
} from '@mantine/core';
import QuizNameEditInput from 'components/Cards/quiz/QuizNameEditInput';
import { Slides } from 'components/Quiz/Slides';
import { FloatingQuizMenu } from 'components/UI/FloatingQuizMenu';
import { useQuiz, useQuizNameEdit } from 'hooks/api/quiz';
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

  const { data: quiz, isLoading: isQuizLoading } = useQuiz(
    router.query.quizId as string
  );

  const {
    editedName,
    setEditedName,
    isEditMode,
    isLoading: isEditLoading,
    onClickToEdit,
    onKeyUp,
    onBlurHandler,
    nameRef,
  } = useQuizNameEdit(quiz);

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
                <FloatingTooltip label="Click to edit">
                  <Skeleton visible={isQuizLoading}>
                    {!isQuizLoading && !isEditMode ? (
                      <Title
                        id="quiz-name"
                        order={5}
                        m={0}
                        onClick={onClickToEdit}
                      >
                        {quiz?.name}
                      </Title>
                    ) : (
                      <QuizNameEditInput
                        ref={nameRef}
                        isLoading={isEditLoading}
                        editedName={editedName}
                        onKeyUp={onKeyUp}
                        onBlurHandler={onBlurHandler}
                        setEditedName={setEditedName}
                      />
                    )}
                  </Skeleton>
                </FloatingTooltip>
              </Grid.Col>
              <Grid.Col
                span={3}
                sx={{
                  display: 'flex',
                  justifyContent: 'right',
                }}
              >
                <Group position="right">
                 
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
                </Group>
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
