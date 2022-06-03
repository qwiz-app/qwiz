import {
  Box,
  Button,
  createStyles,
  Group,
  Navbar,
  Skeleton,
  Stack,
} from '@mantine/core';
import { FramerAnimatedListItem } from 'components/Framer/FramerAnimatedListItem';
import { ThinScrollArea } from 'components/UI/ThinScrollArea';
import { useSlideCreate, useSlides } from 'hooks/api/slide';
import { useRouter } from 'next/router';
import { paths } from 'paths';
import { PlusCircle } from 'phosphor-react';
import { SlidePreview } from './SlidePreview';
import { useCurrentQuiz } from './use-current-quiz';
import { useCurrentSlide } from './use-current-slide';

export const Slides = () => {
  const { classes } = useStyles();
  const router = useRouter();

  const { id: quizId } = useCurrentQuiz();
  const { id: slideId } = useCurrentSlide();

  const { data: slides, isPlaceholderData: arePlacholderSlides } =
    useSlides(quizId);
  const { mutate: createSlide, isLoading: isCreateLoading } = useSlideCreate();

  const handleSlideClick = (selectedSlideId: string) => {
    router.push(paths.quizEditSlide(quizId, selectedSlideId), undefined, {
      shallow: true,
    });
  };

  const handleCreateSlide = () => {
    createSlide(
      { quizId },
      {
        onSuccess: (slide) => {
          router.push(paths.quizEditSlide(quizId, slide.id), undefined, {
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
          px="xs"
          pt="xs"
        >
          <Stack spacing="xs">
            {slides?.map((slide, i) => (
              <FramerAnimatedListItem id={slide.id} key={slide.id}>
                <Skeleton
                  visible={isCreateLoading || arePlacholderSlides}
                  radius="md"
                >
                  <SlidePreview
                    slide={slide}
                    order={i + 1}
                    selectedSlideId={slideId}
                    onSlideClick={handleSlideClick}
                  />
                </Skeleton>
              </FramerAnimatedListItem>
            ))}
          </Stack>
        </Box>
        <Group p="xs">
          <Button
            size="md"
            sx={() => ({ flex: 1 })}
            onClick={handleCreateSlide}
            leftIcon={<PlusCircle weight="duotone" />}
          >
            Add question
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
