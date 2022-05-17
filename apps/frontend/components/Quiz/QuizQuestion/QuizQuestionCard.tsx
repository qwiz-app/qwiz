import {
    Badge,
    Box,
    createStyles,
    Group,
    Paper,
    Stack,
    Text,
    Tooltip,
    UnstyledButton
} from '@mantine/core';
import { formatDate, relativeTimeTo } from 'lib/utils';
import { QuestionWithContentAndOwnerAndCategoriesAndMode } from 'types/question';

interface Props {
  question: QuestionWithContentAndOwnerAndCategoriesAndMode;
  onSelect: (id: string) => void;
}

const QuizQuestionCard = ({ question, onSelect }: Props) => {
  const { classes } = useStyles();
  return (
    <UnstyledButton onClick={() => onSelect(question.id)}>
      <Paper withBorder p="md" className={classes.cardPaper}>
        <Stack spacing={8}>
          <Stack spacing={8}>
            <Group spacing={4} align="center" position="apart">
              <Box>
                {question.isGlobal && (
                  <Badge color="blue" variant="dot" size="sm">
                    Global
                  </Badge>
                )}
                {!question.isGlobal && (
                  <Badge color="indigo" variant="dot" size="sm">
                    Personal
                  </Badge>
                )}
              </Box>
              <Tooltip label={`Updated on ${formatDate(question.updatedAt)}`}>
                <Text size="xs" color="dimmed">
                  {relativeTimeTo(question.updatedAt)}
                </Text>
              </Tooltip>
            </Group>
            <Text size="md" weight="600" color="gray">
              {question.contents[0]?.content}
            </Text>
            {question.categories?.length > 0 && (
              <Group spacing={4}>
                {question.categories.map((category) => (
                  <Badge size="xs" color="indigo" key={category.id}>
                    {category.name}
                  </Badge>
                ))}
              </Group>
            )}
          </Stack>
        </Stack>
      </Paper>
    </UnstyledButton>
  );
};

const useStyles = createStyles((theme) => ({
  cardPaper: {
    background:
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.white,
    '&:hover': {
      background:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },
}));

export default QuizQuestionCard;
