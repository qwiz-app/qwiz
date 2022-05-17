import {
  Badge,
  Box,
  createStyles,
  Image,
  Paper,
  SimpleGrid,
  Stack,
  Title
} from '@mantine/core';
import { QuestionElementType } from '@prisma/client';
import { QuestionWithContentAndOwnerAndCategoriesAndMode } from 'types/question';

interface Props {
  question: QuestionWithContentAndOwnerAndCategoriesAndMode;
}

export const SelectedQuestionModalContent = ({ question }: Props) => {
  const textElements = question.contents.filter(
    ({ type }) => type === QuestionElementType.TEXT
  );
  const imageElements = question.contents.filter(
    ({ type }) => type === QuestionElementType.IMAGE
  );

  const hasTextElements = textElements?.length > 0;
  const hasImageElements = imageElements?.length > 0;

  const { classes } = useStyles();

  return (
    <Box>
      <Box>
        <Title order={5} align="left" mt={20} mb={24}>
          Question contents
        </Title>
        <Stack classNames={classes.sectionElementsWrapper} spacing="lg">
          {hasTextElements && (
            <Paper
              withBorder
              p="md"
              pt="lg"
              radius="md"
              className={classes.sectionElementsWrapper}
            >
              <Badge size="md" className={classes.badge} variant="filled">
                Textual
              </Badge>
              <Stack align="start">
                {textElements.map((elem) => (
                  <Paper key={elem.id} radius="sm">
                    <Title order={6}>{elem.content}</Title>
                  </Paper>
                ))}
              </Stack>
            </Paper>
          )}

          {hasImageElements && (
            <Paper
              withBorder
              p="md"
              radius="md"
              className={classes.sectionElementsWrapper}
            >
              <Badge size="md" className={classes.badge} variant="filled">
                Images
              </Badge>
              <Stack align="start">
                <SimpleGrid cols={2}>
                  {imageElements.map((elem) => (
                    <Paper
                      key={elem.id}
                      radius="sm"
                      sx={() => ({ overflow: 'hidden' })}
                    >
                      <Image src={elem.content} alt="question image" />
                    </Paper>
                  ))}
                </SimpleGrid>
              </Stack>
            </Paper>
          )}
        </Stack>
      </Box>
      <Box>
        <Title order={5} align="left" mt={20} mb={24}>
          Accepted answers
        </Title>
        <Stack classNames={classes.sectionElementsWrapper} spacing="lg">
          Answers
        </Stack>
      </Box>
    </Box>
  );
};

const useStyles = createStyles((theme) => ({
  sectionWrapper: {
    width: '100%',
  },

  sectionElementsWrapper: {
    position: 'relative',
  },

  badge: {
    position: 'absolute',
    top: -9,
    left: 16,
    zIndex: 10,
  },
}));
