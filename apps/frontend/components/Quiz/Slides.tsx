import {
  Box,
  Button,
  createStyles,
  Group,
  LoadingOverlay,
  Navbar,
  Stack
} from '@mantine/core';
import { ThinScrollArea } from 'components/UI/ThinScrollArea';
import { useSlideCreate, useSlides } from 'hooks/api/slide';
import { useRouter } from 'next/router';
import { Plus } from 'phosphor-react';
import { SlidePreview } from './SlidePreview';

export const Slides = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const { quizId, slideId } = router.query;

  const { mutate: createSlide, isLoading: isCreateLoading } = useSlideCreate();
  const { data: slides } = useSlides(quizId as string, quizId === 'edit');

  const handleSlideClick = (selectedSlideId: string) => {
    router.push(`/quiz/${quizId}/${selectedSlideId}`, undefined, {
      shallow: true,
    });
  };

  const handleCreateSlide = () => {
    createSlide(
      { quizId: quizId as string },
      {
        onSuccess: (slide) => {
          router.push(`/quiz/${quizId}/${slide.id}`, undefined, {
            shallow: true,
          });
        },
      }
    );
  };

  const redirecToGeneralHandler = () => {
    let whereTo = 'edit';

    if (slides?.length) {
      const [last] = slides.slice(-1);
      // TODO: doesnt work when we are deleting our last one because its not deleted yet
      whereTo = last.id;
    }

    router.push(`/quiz/${quizId}/${whereTo}`);
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
          <LoadingOverlay visible={isCreateLoading} />
          {slides?.map((slide, i) => (
            <SlidePreview
              key={slide.id}
              slide={slide}
              order={i + 1}
              selectedSlideId={slideId as string}
              onSlideClick={handleSlideClick}
              onDeleteCurrentSlide={redirecToGeneralHandler}
            />
          ))}
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
