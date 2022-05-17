import {
    createStyles,
    Paper,
    Stack,
    Text,
    UnstyledButton
} from '@mantine/core';
import { QuestionWithContentAndOwnerAndCategoriesAndMode } from 'types/question';

interface Props {
  question: QuestionWithContentAndOwnerAndCategoriesAndMode;
}

const QuizQuestionCard = ({ question }: Props) => {
  const { classes } = useStyles();
  return (
    <UnstyledButton>
      <Paper withBorder p="md" className={classes.cardPaper}>
        <Stack>
          <Text size="md" weight="600" color="gray">
            {question.contents[0]?.content}
          </Text>
        </Stack>
      </Paper>
    </UnstyledButton>
  );
};

const useStyles = createStyles((theme) => ({
  cardPaper: {
    '&:hover': {
      background:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[1],
    },
  },
}));

export default QuizQuestionCard;
