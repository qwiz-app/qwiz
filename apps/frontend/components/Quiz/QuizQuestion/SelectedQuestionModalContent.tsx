import {
  Badge,
  Box,
  createStyles,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { useQuestionContents } from 'hooks/use-question-contents';
import { formatDate, relativeTimeTo } from 'lib/utils';
import { QuestionWithContentAndCategoriesAndMode } from 'types/api/question';

interface Props {
  question: QuestionWithContentAndCategoriesAndMode;
}

export const SelectedQuestionModalContent = ({ question }: Props) => {
  const { classes } = useStyles();
  const {
    textualContent,
    imageContent,
    hasTextualContent,
    hasImageContent,
    hasCategories,
  } = useQuestionContents(question);

  return (
    <Box>
      <Group position="right" mb={16}>
        <Tooltip
          label={formatDate(question.updatedAt)}
          position="top"
          withArrow
          gutter={8}
        >
          <Text size="xs" color="dimmed">
            Updated {relativeTimeTo(question.updatedAt)}
          </Text>
        </Tooltip>
      </Group>
      <Stack classNames={classes.sectionsWrapper} spacing="lg">
        {hasTextualContent && (
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
              {textualContent.map((elem) => (
                <Paper key={elem.id} radius="md">
                  <Title order={6} sx={() => ({ lineHeight: 1.25 })}>
                    {elem.content}
                  </Title>
                </Paper>
              ))}
            </Stack>
          </Paper>
        )}

        {hasImageContent && (
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
                {imageContent.map((elem) => (
                  <Paper
                    key={elem.id}
                    radius="sm"
                    className={classes.thumbnailWrapper}
                  >
                    <Image
                      className={classes.thumbnail}
                      height="100%"
                      fit="cover"
                      styles={{
                        root: { height: '100%' },
                        imageWrapper: { height: '100%' },
                        figure: { height: '100%' },
                      }}
                      src={elem.content}
                      alt="question image"
                      onClick={() => window.open(elem.content)}
                    />
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

        <Group align="start" spacing={8}>
          {question.isGlobal && (
            <Badge color="green" variant="dot" size="sm">
              Global
            </Badge>
          )}
          {!question.isGlobal && (
            <Badge color="orange" variant="dot" size="sm">
              Personal
            </Badge>
          )}
          {hasCategories &&
            question.categories.map((elem) => (
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
      </Stack>
    </Box>
  );
};

const useStyles = createStyles(() => ({
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

  thumbnailWrapper: {
    overflow: 'hidden',
  },

  thumbnail: {
    cursor: 'pointer',
    aspectRatio: '1',
  },
}));
