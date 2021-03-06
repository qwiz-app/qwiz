import { createStyles, Grid } from '@mantine/core';
import QuizLayout from 'components/Layouts/QuizLayout';
import { MainSlide } from 'components/Quiz/MainSlide';
import { useSelectedQuestion } from 'components/Quiz/QuizQuestion/use-selected-question';
import { QuizRightSide } from 'components/Quiz/QuizRightSide';

const QuizPage = () => {
  const { classes } = useStyles();
  const { selectedQuestion } = useSelectedQuestion();

  return (
    <Grid className={classes.wrapper}>
      <Grid.Col span={9}>
        <MainSlide question={selectedQuestion} />
      </Grid.Col>
      <Grid.Col span={3} sx={() => ({ marginLeft: 'auto' })}>
        <QuizRightSide />
      </Grid.Col>
    </Grid>
  );
};

export default QuizPage;

QuizPage.getLayout = function getLayout(page) {
  return <QuizLayout>{page}</QuizLayout>;
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    maxHeight: '100vh',
    overflow: 'hidden',
  },
}));
