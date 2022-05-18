import {
  Badge,
  Box,
  createStyles,
  Group,
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
  const hasCategories = question.categories?.length > 0;

  const { classes } = useStyles();

  return (
    <Box>
      <Stack classNames={classes.sectionsWrapper} spacing="lg">
        {hasTextElements && (
          <Paper
            withBorder
            p="md"
            pt="lg"
            radius="md"
            className={classes.sectionElementsWrapper}
          >
            <Badge size="sm" className={classes.badge} variant="light">
              Textual
            </Badge>
            <Stack align="start" spacing={4}>
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
            pt="lg"
            radius="md"
            className={classes.sectionElementsWrapper}
          >
            <Badge size="sm" className={classes.badge} variant="light">
              Images
            </Badge>
            <Stack align="start" spacing={8}>
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

        <Paper
          withBorder
          p="md"
          pt="lg"
          radius="md"
          className={classes.sectionElementsWrapper}
        >
          <Badge size="sm" className={classes.badge} variant="light">
            Answers
          </Badge>
          <Group align="start" spacing={8}>
            {['answer1', 'answer2'].map((elem) => (
              <Badge variant="light" key={elem} radius="sm" size="md">
                {elem}
              </Badge>
            ))}
          </Group>
        </Paper>

        {hasCategories && (
          <Group align="start" spacing={8}>
            {question.isGlobal && (
              <Badge color="green" variant="dot" size="sm">
                Global
              </Badge>
            )}
            {!question.isGlobal && (
              <Badge color="indigo" variant="dot" size="sm">
                Personal
              </Badge>
            )}
            {question.categories.map((elem) => (
              <Badge
                variant="light"
                color={elem.color}
                size="sm"
                key={elem.id}
                radius="xl"
              >
                {elem.name}
              </Badge>
            ))}
          </Group>
        )}
      </Stack>
    </Box>
  );
};

const useStyles = createStyles((theme) => ({
  sectionsWrapper: {
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
