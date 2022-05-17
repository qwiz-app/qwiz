import { createStyles, Grid } from '@mantine/core';
import QuizLayout from 'components/Layouts/QuizLayout';
import { MainSlide } from 'components/Quiz/MainSlide';
import { QuizRightSide } from 'components/Quiz/QuizRightSide';

const QuizPage = () => {
  const { classes } = useStyles();

  return (
    <Grid className={classes.wrapper}>
      <Grid.Col span={9}>
        <MainSlide />
      </Grid.Col>
      <Grid.Col span={3}>
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
    height: '100%',
  },
}));
