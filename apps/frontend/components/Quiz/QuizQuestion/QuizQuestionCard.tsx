import {
  ActionIcon,
  Badge,
  Box,
  createStyles,
  Group, Paper,
  Stack,
  Text,
  Tooltip,
  UnstyledButton
} from '@mantine/core';
import { QuestionElementType } from '@prisma/client';
import { formatDate, relativeTimeTo } from 'lib/utils';
import { CheckCircle, PlusCircle } from 'phosphor-react';
import { SyntheticEvent } from 'react';
import { QuestionWithContentAndCategoriesAndMode } from 'types/api/question';
import { useCurrentSlide } from '../use-current-slide';

interface Props {
  question: QuestionWithContentAndCategoriesAndMode;
  onSelect?: (question: QuestionWithContentAndCategoriesAndMode) => void;
  onUseQuestion?: (id: string) => void;
}

export const QuizQuestionCard = ({
  question,
  onSelect,
  onUseQuestion,
}: Props) => {
  const { classes } = useStyles();

  const { slide } = useCurrentSlide();

  const questionUseHandler = (e: SyntheticEvent) => {
    e.stopPropagation();
    onUseQuestion(question.id);
  };

  const isSelected = question.id === slide?.quizQuestion?.questionId;

  const getTextContent = () => {
    const textElements = question.contents.filter(
      ({ type }) => type === QuestionElementType.TEXT
    );
    return textElements[0]?.content;
  };

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
                  <Badge size="xs" color={category.color} key={category.id}>
                    {category.name}
                  </Badge>
                ))}
              </Group>
            )}
            {isSelected ? (
              <Tooltip label="Question selected" ml="auto">
                <ActionIcon size="lg" variant="transparent" color="green">
                  <CheckCircle size={24} weight="duotone" />
                </ActionIcon>
              </Tooltip>
            ) : (
              <Tooltip
                label="Use question"
                onClick={questionUseHandler}
                ml="auto"
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
