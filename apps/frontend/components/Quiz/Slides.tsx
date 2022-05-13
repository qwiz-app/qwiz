import { useEffect, useState } from 'react';
import { Reorder } from 'framer-motion';
import { Text, Box, createStyles, Navbar, Skeleton } from '@mantine/core';
import { Plus } from 'phosphor-react';
import { ThinScrollArea } from 'components/UI/ThinScrollArea';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { useQuiz } from 'hooks/api/quiz';
import { SlideWithQuestionAndElements } from 'types/slide';

export const Slides = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const { quizId, questionId } = router.query;

  const { data: quiz, isSuccess } = useQuiz(quizId as string);

  const [slides, setSlides] = useState<
    SlideWithQuestionAndElements[] | number[]
  >([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  useEffect(() => {
    if (isSuccess) {
      setSlides(quiz.slides);
    }
  }, [isSuccess]);

  const handleClick = (selectedQuestionId: string) => {
    router.push(`/quiz/${quizId}/${selectedQuestionId}`, undefined, {
      shallow: true,
    });
  };

  return (
    <Navbar.Section grow component={ThinScrollArea} className={classes.wrapper}>
      <Reorder.Group
        axis="y"
        values={slides}
        onReorder={setSlides}
        style={{ padding: 0, marginBottom: 56 }}
      >
        {slides?.map((slide) => (
          <Reorder.Item
            key={slide.id}
            value={slide}
            style={{ listStyle: 'none' }}
          >
            <Skeleton
              visible={!isSuccess}
              sx={(theme) => ({
                borderRadius: theme.radius.md,
                margin: !isSuccess ? theme.radius.md : 0,
              })}
            >
              <Box
                className={cn(
                  classes.box,
                  questionId === slide.id && classes.selected
                )}
                onClick={() => handleClick(slide.id)}
              >
                <div>
                  <Text color="dimmed" size="sm">
                    {slide.ordinal}
                  </Text>
                </div>
              </Box>
            </Skeleton>
          </Reorder.Item>
        ))}
      </Reorder.Group>
      <Box className={classes.addNew}>
        <Plus />
        <Text ml={8}>New Question</Text>
      </Box>
    </Navbar.Section>
  );
};

const useStyles = createStyles((theme) => ({
  box: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    textAlign: 'center',
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    margin: theme.radius.md,
    cursor: 'pointer',
    borderColor: 'transparent',
    borderWidth: 2,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },
  },

  selected: {
    borderColor:
      theme.colorScheme === 'dark'
        ? theme.colors.blue[5]
        : theme.colors.blue[2],
    borderWidth: 2,
  },

  addNew: {
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    width: 200,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    padding: theme.spacing.sm,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },
    cursor: 'pointer',
  },

  wrapper: {
    position: 'relative',
  },
}));
