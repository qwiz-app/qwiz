import {
  Anchor,
  AspectRatio,
  Box,
  createStyles,
  Group,
  Image,
  LoadingOverlay,
  Paper,
  Stack,
  Text
} from '@mantine/core';
import PeepDark from 'assets/peeps/slide/peep-slide-dark.svg';
import Peep from 'assets/peeps/slide/peep-slide.svg';
import { useSlideCreate, useSlides } from 'hooks/api/slide';
import { useAppColorscheme } from 'hooks/colorscheme';
import { useQuestionContents } from 'hooks/use-question-contents';
import NextImage from 'next/image';
import { useRouter } from 'next/router';
import { paths } from 'paths';
import { QuestionWithContentAndCategoriesAndMode } from 'types/api/question';
import { EmptySlideAlert } from './EmptySlideAlert';
import { useCurrentQuiz } from './use-current-quiz';
import { useCurrentSlide } from './use-current-slide';

interface Props {
  question: QuestionWithContentAndCategoriesAndMode;
}

export const MainSlide = ({ question }: Props) => {
  const { classes } = useStyles();
  const { isDark } = useAppColorscheme();
  const router = useRouter();

  const { id: quizId } = useCurrentQuiz();
  const { data: slides, isLoading: isSlidesLoading } = useSlides(quizId);
  const { slide, isLoading, hasQuestion } = useCurrentSlide();
  const { mutate: createSlide } = useSlideCreate();
  const hasSlides = !isSlidesLoading && !!slides?.length;

  const { textualContent, imageContent, hasImageContent, hasTextualContent } =
    useQuestionContents(slide?.quizQuestion?.question);

  const handleCreateSlide = () => {
    createSlide(
      { quizId },
      {
        onSuccess: (newSlide) => {
          router.push(paths.quizEditSlide(quizId, newSlide.id), undefined, {
            shallow: true,
          });
        },
      }
    );
  };

  return (
    <Box className={classes.wrapper}>
      <AspectRatio ratio={16 / 9}>
        <Paper withBorder radius="md" px="sm">
          <LoadingOverlay visible={isLoading} />
          <Stack className={classes.box} align="center" justify="space-evenly">
            {hasTextualContent && (
              <Stack>
                {textualContent?.map((elem) => (
                  <Text className={classes.text} key={elem.id} align="center">
                    {elem.content}
                  </Text>
                ))}
              </Stack>
            )}
            {hasImageContent && (
              <Group className={classes.imageElements}>
                {imageContent.map((elem) => (
                  <Image
                    key={elem.id}
                    src={elem.content}
                    height="clamp(100px, 30vh, 400px)"
                    withPlaceholder
                    radius="sm"
                    alt="question image"
                  />
                ))}
              </Group>
            )}
            {!hasTextualContent && !hasImageContent && !isLoading && (
              <Stack align="center" spacing={0}>
                <NextImage
                  height={400}
                  width={400}
                  src={isDark ? PeepDark : Peep}
                  alt="illustration"
                />
                {hasSlides ? (
                  <Text size="xl">Pick any question</Text>
                ) : (
                  <Text size="xl">
                    <Anchor component="p" onClick={handleCreateSlide}>
                      Create your first slide
                    </Anchor>
                  </Text>
                )}
              </Stack>
            )}
          </Stack>
        </Paper>
      </AspectRatio>
      {hasSlides && !hasQuestion && (
        <EmptySlideAlert />
      )}
    </Box>
  );
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    maxWidth: 1400,
    margin: '0 auto',
    height: '100%',
    flex: 1,
  },

  box: {
    position: 'relative',
    gap: '4vh',
  },

  stack: {
    height: '100%',
  },

  text: {
    fontWeight: 600,
    fontSize: 'clamp(20px, -2rem + 5vw, 3rem)',
    lineHeight: 1.2,
  },

  imageElements: {
    overflow: 'hidden',
  },
}));
