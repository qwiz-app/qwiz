import {
  ActionIcon,
  Badge,
  Box,
  createStyles,
  Group,
  Paper,
  Stack,
  Text,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { QuestionElementType } from '@prisma/client';
import { formatDate, relativeTimeTo } from 'lib/utils';
import { CheckCircle, PlusCircle } from 'phosphor-react';
import { SyntheticEvent } from 'react';
import { QuestionWithContentAndOwnerAndCategoriesAndMode } from 'types/question';
import { useSelectedQuestion } from './use-selected-question';

interface Props {
  question: QuestionWithContentAndOwnerAndCategoriesAndMode;
  onSelect?: (id: QuestionWithContentAndOwnerAndCategoriesAndMode) => void;
}

export const QuizQuestionCard = ({ question, onSelect }: Props) => {
  const { classes } = useStyles();
  const { selectedQuestion, setSelectedQuestion } = useSelectedQuestion();

  const getTextContent = () => {
    const textElements = question.contents.filter(
      ({ type }) => type === QuestionElementType.TEXT
    );
    return textElements[0]?.content;
  };

  const questionUseHandler = (e: SyntheticEvent) => {
    e.stopPropagation();
    setSelectedQuestion(question);
  };

  const isSelected = selectedQuestion?.id === question.id;

  return (
    <UnstyledButton
      onClick={() => onSelect(question)}
      className={classes.btnWrapper}
    >
      <Paper withBorder p="md" radius="md" className={classes.cardPaper}>
        <Stack spacing="sm">
          <Group spacing={4} align="center" position="apart">
            <Box>
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
            </Box>
            <Group position="right" align="center" spacing={8}>
              <Tooltip
                withArrow
                label={`Updated on ${formatDate(question.updatedAt)}`}
              >
                <Text size="xs" color="dimmed">
                  {relativeTimeTo(question.updatedAt)}
                </Text>
              </Tooltip>
            </Group>
          </Group>
          <Text size="md" weight="600" color="gray">
            {getTextContent()}
          </Text>
        </Stack>
        <Stack mt={2}>
          <Group position="apart" align="center">
            {question.categories?.length > 0 && (
              <Group spacing={4}>
                {question.categories.map((category) => (
                  <Badge size="xs" color="indigo" key={category.id}>
                    {category.name}
                  </Badge>
                ))}
              </Group>
            )}
            {isSelected ? (
              <Tooltip withArrow label="Question selected">
                <ActionIcon size="lg" variant="transparent" color="green">
                  <CheckCircle size={24} weight="duotone" />
                </ActionIcon>
              </Tooltip>
            ) : (
              <Tooltip
                withArrow
                label="Use question"
                onClick={questionUseHandler}
              >
                <ActionIcon size="lg" variant="transparent" color="indigo">
                  <PlusCircle size={24} weight="duotone" />
                </ActionIcon>
              </Tooltip>
            )}
          </Group>
        </Stack>
      </Paper>
    </UnstyledButton>
  );
};

const useStyles = createStyles((theme) => ({
  btnWrapper: {
    width: '100%',
  },

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
