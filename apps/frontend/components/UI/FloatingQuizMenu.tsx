import { Button, createStyles, Group, Paper } from '@mantine/core';
import { QuestionElementType } from '@prisma/client';
import { QuestionCreateModal } from 'components/Quiz/QuizQuestion/QuizQuestionCreateModal';
import { useAppColorscheme } from 'hooks/colorscheme';
import { TextT } from 'phosphor-react';
import { useState } from 'react';

export const FloatingQuizMenu = () => {
  const [showQuestionModal, setShowQuestionModal] = useState(false);

  const { isDark } = useAppColorscheme();
  const { classes } = useStyles();

  const handleQuestionClick = () => {
    setShowQuestionModal(true);
  };

  return (
    <Paper shadow="xs" p="md" className={classes.wrapper} radius="md">
      <Group spacing="xs">
        <Button
          leftIcon={<TextT size={20} weight="duotone" />}
          variant={isDark ? 'light' : 'filled'}
          onClick={handleQuestionClick}
          color="orange"
        >
          Create question
        </Button>
      </Group>
      <QuestionCreateModal
        opened={showQuestionModal}
        setOpened={setShowQuestionModal}
      />
    </Paper>
  );
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 'max-content',
  },
}));

interface GenerateMutateDataProps {
  type: QuestionElementType;
  content: string;
  slideId: string | string[];
}

export const generateMutateData = ({
  type,
  content,
  slideId,
}: GenerateMutateDataProps) => {
  return {
    content,
    type,
    question: {
      create: {},
    },
    quizSlideElement: {
      create: [
        {
          quizSlideId: slideId as string,
          point: {
            create: {
              x: 0.5,
              y: 0.5,
              width: 300,
              height: 300,
            },
          },
        },
      ],
    },
  };
};
