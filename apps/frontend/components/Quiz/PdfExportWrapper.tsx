import {
  AspectRatio,
  createStyles,
  Group,
  Image,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import { useQuestionContents } from 'hooks/use-question-contents';

export const PdfExportWrapper = ({ slide }) => {
  const { textualContent, imageContent, hasImageContent, hasTextualContent } =
    useQuestionContents(slide?.quizQuestion?.question);

  const { classes } = useStyles();

  return (
    hasTextualContent &&
    hasImageContent && (
      <AspectRatio ratio={1.4142 / 1}>
        <Paper withBorder radius="md" px="sm">
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
          </Stack>
        </Paper>
      </AspectRatio>
    )
  );
};

const useStyles = createStyles((theme) => ({
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
