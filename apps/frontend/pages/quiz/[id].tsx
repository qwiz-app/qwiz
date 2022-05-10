import { AspectRatio, Box, createStyles } from '@mantine/core';
import QuizLayout from 'components/Layouts/QuizLayout';
import { DraggableElement } from 'components/Quiz/DraggableElement';
import { motion } from 'framer-motion';
import { useQuiz } from 'hooks/api/quiz';
import { useRouter } from 'next/router';
import { useRef } from 'react';

const QuizPage = () => {
  const router = useRouter();
  const { classes } = useStyles();

  const constraintsRef = useRef<HTMLDivElement>(null);

  const { data: quiz } = useQuiz(router.query.id as string);

  return (
    <div>
      <AspectRatio ratio={14 / 7}>
        <Box className={classes.box}>
          <motion.div
            style={{
              width: '100%',
              height: '100%',
            }}
            ref={constraintsRef}
          />
          <DraggableElement constraintsRef={constraintsRef}>
            {quiz?.name}
          </DraggableElement>
        </Box>
      </AspectRatio>
    </div>
  );
};

export default QuizPage;

QuizPage.getLayout = function getLayout(page) {
  return <QuizLayout>{page}</QuizLayout>;
};

const useStyles = createStyles((theme) => ({
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
