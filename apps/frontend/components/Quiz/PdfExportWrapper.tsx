import {
  AspectRatio,
  createStyles,
  Group,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import { useQuestionContents } from 'hooks/use-question-contents';
import LogoDark from 'assets/logo/qwiz-dark.svg';
import Image from 'next/image';

export const PdfExportWrapper = ({ slide }) => {
  const { textualContent, imageContent, hasImageContent, hasTextualContent } =
    useQuestionContents(slide?.quizQuestion?.question);

  const { classes } = useStyles();

  return (
    (hasTextualContent || hasImageContent) && (
      <AspectRatio ratio={1.4142 / 1}>
        <Paper withBorder radius="md" px="sm" className={classes.wrapper}>
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
            <div className={classes.logo}>
              <Image src={LogoDark} width={50} height={50} alt="logo" />
            </div>
          </Stack>
        </Paper>
      </AspectRatio>
    )
  );
};

const useStyles = createStyles((theme) => ({
  box: {
    gap: '4vh',
  },

  wrapper: {
    position: 'relative',
    minHeight: '100%',
  },

  stack: {
    height: '100%',
  },

  text: {
    fontWeight: 600,
    fontSize: '2.5rem',
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
    height: '45vh',
  },

  logo: {
    position: 'absolute',
    bottom: 0,
    left: 16,
  },
}));
