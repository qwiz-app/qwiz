import { AspectRatio, Box, createStyles, Grid } from '@mantine/core';
import QuizLayout from 'components/Layouts/QuizLayout';
import { DraggableElement } from 'components/Quiz/DraggableElement';
import { SideMenu } from 'components/Quiz/SideMenu';
import { motion } from 'framer-motion';
import { useQuiz } from 'hooks/api/quiz';
import { useRouter } from 'next/router';
import { useRef, useEffect, useState } from 'react';

const QuizPage = () => {
  const router = useRouter();
  const { classes } = useStyles();

  const constraintsRef = useRef<HTMLDivElement>(null);
  const [draggedItems, setDraggedItems] = useState([]);

  const { data: quiz } = useQuiz(router.query.quizId as string);

  useEffect(() => {
    const str = localStorage.getItem('array');
    const parsedArr = JSON.parse(str);

    if (parsedArr) {
      setDraggedItems(parsedArr);
      return;
    }
    const arr = [1, 2, 3, 4, 5].map((num) => ({
      x: num * 50,
      y: (num * 100) / 2,
      id: `${num}`,
      width: 0.1,
      height: 0.1,
      z: 1,
    }));
    const jsonArr = JSON.stringify(arr);
    localStorage.setItem('array', jsonArr);
  }, []);

  return (
    <Grid className={classes.wrapper}>
      <Grid.Col span={9}>
        <AspectRatio ratio={16 / 9}>
          <Box className={classes.box}>
            <motion.div
              style={{
                width: '100%',
                height: '100%',
              }}
              ref={constraintsRef}
            />
            {draggedItems?.map((item) => (
              <DraggableElement
                key={item.id}
                initial={{
                  x: item.x,
                  y: item.y,
                }}
                constraintsRef={constraintsRef}
                id={item.id}
              >
                {quiz?.name}
              </DraggableElement>
            ))}
          </Box>
        </AspectRatio>
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
  box: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[2],
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    position: 'relative',
  },
}));
