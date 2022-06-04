import {
  AspectRatio,
  createStyles,
  Group,
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
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className={classes.image}
                    key={elem.id}
                    src={elem.content}
                    alt="question"
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
    fontSize: '2rem',
    lineHeight: 1.2,
    marginBottom: '2rem',
  },

  imageElements: {
    overflow: 'hidden',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },

  image: {
    height: '50vh',
  },
}));
