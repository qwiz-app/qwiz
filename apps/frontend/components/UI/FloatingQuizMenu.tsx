import { Button, createStyles, Grid, Paper } from '@mantine/core';
import { useQuestionContentCreate } from 'hooks/api/slide';
import { useRouter } from 'next/router';
import { TextT, Image as ImageIcon } from 'phosphor-react';

export const FloatingQuizMenu = () => {
  const router = useRouter();

  const { slideId } = router.query;
  const { mutate } = useQuestionContentCreate(slideId as string);

  const { classes } = useStyles();

  const handleTextClick = () => {
    mutate({
      content: 'Edit me',
      type: 'TEXT',
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
                width: 100,
                height: 16,
              },
            },
          },
        ],
      },
    });
  };

  return (
    <Paper shadow="xs" p="md" className={classes.wrapper}>
      <Grid grow>
        <Grid.Col span={6}>
          <Button
            leftIcon={<TextT />}
            variant="outline"
            onClick={handleTextClick}
          >
            Add text
          </Button>
        </Grid.Col>
        <Grid.Col span={6}>
          <Button leftIcon={<ImageIcon />} variant="outline" disabled>
            Add image
          </Button>
        </Grid.Col>
      </Grid>
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
    width: '300px',
  },
}));
