import {
  Box,
  Button,
  createStyles,
  Group,
  Navbar,
  Stack,
  Text,
} from '@mantine/core';
import cn from 'classnames';
import { ThinScrollArea } from 'components/UI/ThinScrollArea';
import { Reorder } from 'framer-motion';
import { useQuiz } from 'hooks/api/quiz';
import { useSlideCreate } from 'hooks/api/slide';
import { useRouter } from 'next/router';
import { Plus } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { SlideWithQuestionAndElements } from 'types/slide';

export const Slides = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const { quizId, slideId } = router.query;

  const { data: quiz, isSuccess } = useQuiz(quizId as string);
  const { mutate: createSlide } = useSlideCreate();

  const [slides, setSlides] = useState<SlideWithQuestionAndElements[]>(null);

  useEffect(() => {
    if (isSuccess) {
      setSlides(quiz.slides);
    }
  }, [isSuccess]);

  const handleClick = (selectedSlideId: string) => {
    router.push(`/quiz/${quizId}/${selectedSlideId}`, undefined, {
      shallow: true,
    });
  };

  const handleCreateSlide = () => {
    createSlide(
      {
        quizId: quizId as string,
        ordinal: slides.length + 1,
      },
      {
        onSuccess: (slide) => {
          setSlides([...slides, slide]);
          router.push(`/quiz/${quizId}/${slide.id}`, undefined, {
            shallow: true,
          });
        },
      }
    );
  };

  return (
    <Navbar.Section grow className={classes.wrapper}>
      <Stack
        spacing={4}
        sx={() => ({ height: '100%', flex: 1 })}
        justify="space-between"
      >
        <Box
          sx={() => ({ height: '100%', flex: 1 })}
          component={ThinScrollArea}
        >
          {slides && (
            <Reorder.Group
              axis="y"
              values={slides}
              onReorder={setSlides}
              style={{ padding: 0 }}
            >
              {slides.map((slide) => (
                <Reorder.Item
                  key={slide.id}
                  value={slide}
                  style={{ listStyle: 'none' }}
                >
                  <Box
                    className={cn(
                      classes.box,
                      slideId === slide.id && classes.selected
                    )}
                    onClick={() => handleClick(slide.id)}
                  >
                    <div>
                      <Text color="dimmed" size="sm">
                        {slide.ordinal}
                      </Text>
                    </div>
                  </Box>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          )}
        </Box>
        <Group p="xs">
          <Button
            size="md"
            sx={() => ({ flex: 1 })}
            onClick={handleCreateSlide}
            leftIcon={<Plus weight="duotone" />}
          >
            Add Question
          </Button>
        </Group>
      </Stack>
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
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    margin: theme.radius.md,
    cursor: 'pointer',
    borderColor: 'transparent',
    borderWidth: 2,
    aspectRatio: '17/11',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

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
    height: '100%',
  },
}));
