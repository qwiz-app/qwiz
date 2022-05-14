import { createStyles, Grid } from '@mantine/core';
import QuizLayout from 'components/Layouts/QuizLayout';
import { MainSlide } from 'components/Quiz/MainSlide';
import { SideMenu } from 'components/Quiz/SideMenu';

const QuizPage = () => {
  const { classes } = useStyles();

  return (
    <Grid className={classes.wrapper}>
      <Grid.Col span={9}>
        <MainSlide />
      </Grid.Col>
      <Grid.Col span={3}>
        <SideMenu />
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
