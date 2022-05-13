import { AspectRatio, Box, createStyles, Grid } from '@mantine/core';
import QuizLayout from 'components/Layouts/QuizLayout';
import { DraggableElement } from 'components/Quiz/DraggableElement';
import { SideMenu } from 'components/Quiz/SideMenu';
import { motion } from 'framer-motion';
import { useSlide } from 'hooks/api/slide';
import { useBackgroundColor } from 'hooks/use-background-color';
import { useRouter } from 'next/router';
import { useRef } from 'react';

const QuizPage = () => {
  const router = useRouter();
  const { classes } = useStyles();

  const { backgroundColor } = useBackgroundColor();

  const constraintsRef = useRef<HTMLDivElement>(null);

  const { data: slide } = useSlide(router.query.questionId as string);

  return (
    <Grid className={classes.wrapper}>
      <Grid.Col span={9}>
        <AspectRatio ratio={16 / 9}>
          <Box className={classes.box} style={{ backgroundColor }}>
            <motion.div
              style={{
                width: '100%',
                height: '100%',
              }}
              ref={constraintsRef}
            />
            {slide?.elements?.map((element) => (
              <DraggableElement
                key={element.id}
                initial={{
                  x: element.point.x,
                  y: element.point.y,
                }}
                constraintsRef={constraintsRef}
                id={element.id}
                dimensions={{
                  width: element?.point?.width,
                  height: element?.point?.height,
                }}
                type={element.questionContent.type}
                content={element.questionContent.content}
              />
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
    borderRadius: theme.radius.md,
    position: 'relative',
  },
}));
