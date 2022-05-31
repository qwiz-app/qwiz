import {
  Alert,
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
import { QuestionElementType } from '@prisma/client';
import PeepDark from 'assets/peeps/slide/peep-slide-dark.svg';
import Peep from 'assets/peeps/slide/peep-slide.svg';
import { useAppColorscheme } from 'hooks/colorscheme';
import NextImage from 'next/image';
import { WarningCircle } from 'phosphor-react';
import { QuestionWithContentAndCategoriesAndMode } from 'types/api/question';
import { useCurrentSlide } from './use-current-slide';

interface Props {
  question: QuestionWithContentAndCategoriesAndMode;
}

export const MainSlide = ({ question }: Props) => {
  const { slide, isLoading } = useCurrentSlide();

  const contents = slide?.quizQuestion?.question?.contents;

  const textElements = contents?.filter(
    ({ type }) => type === QuestionElementType.TEXT
  );
  const imageElements = contents?.filter(
    ({ type }) => type === QuestionElementType.IMAGE
  );

  const hasTextElements = textElements?.length > 0;
  const hasImageElements = imageElements?.length > 0;

  const { classes } = useStyles();
  const { isDark } = useAppColorscheme();

  const hasNoQuestion = !slide?.quizQuestion?.id && !isLoading;

  return (
    <Box className={classes.wrapper}>
      <AspectRatio ratio={16 / 9}>
        <Paper withBorder radius="md">
          <LoadingOverlay visible={isLoading} />
          <Stack className={classes.box} align="center" justify="space-evenly">
            {hasTextElements && (
              <Stack>
                {textElements?.map((elem) => (
                  <Text className={classes.text} key={elem.id} align="center">
                    {elem.content}
                  </Text>
                ))}
              </Stack>
            )}
            {hasImageElements && (
              <Group className={classes.imageElements}>
                {imageElements.map((elem) => (
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
            {!hasTextElements && !hasImageElements && !isLoading && (
              <Stack align="center" spacing={0}>
                <NextImage
                  height={400}
                  width={400}
                  src={isDark ? PeepDark : Peep}
                  alt="illustration"
                />
                <Text size="xl">Pick any question</Text>
              </Stack>
            )}
          </Stack>
        </Paper>
      </AspectRatio>
      {hasNoQuestion && (
        <Alert
          icon={<WarningCircle size={16} />}
          title="Empty slide"
          radius="md"
          variant="light"
          mt="sm"
          sx={() => ({
            maxWidth: 350,
          })}
        >
          Slide has no question assigned.
        </Alert>
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
