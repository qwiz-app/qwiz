import { AspectRatio, Box, createStyles } from '@mantine/core';
import { motion } from 'framer-motion';
import { useBackgroundColor } from 'hooks/use-background-color';
import { useRef } from 'react';
import { DraggableElement } from './DraggableElement';
import { useCurrentSlide } from './use-current-slide';

export const MainSlide = () => {
  const { slide } = useCurrentSlide();

  const { classes } = useStyles();
  const { backgroundColor } = useBackgroundColor();

  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
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
              // TODO: mislav shall fix this :maja:
              x: element.point.x as unknown as number,
              y: element.point.y as unknown as number,
            }}
            constraintsRef={constraintsRef}
            id={element.point.id}
            dimensions={{
              width: element?.point?.width,
              height: element?.point?.height,
            }}
            content={{
              id: element.questionContent.id,
              value: element.questionContent.content,
              type: element.questionContent.type,
            }}
          />
        ))}
      </Box>
    </AspectRatio>
  );
};

const useStyles = createStyles((theme) => ({
  box: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[2],
    borderRadius: theme.radius.md,
    position: 'relative',
  },
}));
