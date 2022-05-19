import { Button, createStyles, Group, Paper } from '@mantine/core';
import { QuestionElementType } from '@prisma/client';
import { useQuestionContentCreate } from 'hooks/api/slide';
import { useRouter } from 'next/router';
import { TextT, Image as ImageIcon } from 'phosphor-react';

export const FloatingQuizMenu = () => {
  const router = useRouter();

  const { slideId } = router.query;
  const { mutate } = useQuestionContentCreate(slideId as string);

  const { classes } = useStyles();

  const handleTextClick = () => {
    mutate(
      generateMutateData({
        type: QuestionElementType.TEXT,
        content: 'Edit me',
        slideId,
      })
    );
  };

  return (
    <Paper shadow="xs" p="md" className={classes.wrapper} radius="md">
      <Group spacing="xs">
        <Button
          leftIcon={<TextT size={18} weight="duotone" />}
          variant="filled"
          onClick={handleTextClick}
          color="indigo"
        >
          Add text
        </Button>
        <Button
          leftIcon={<ImageIcon size={18} weight="duotone" />}
          variant="light"
          color="indigo"
        >
          Add image
        </Button>
      </Group>
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

const generateMutateData = ({
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
