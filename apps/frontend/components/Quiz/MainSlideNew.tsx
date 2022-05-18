import { AspectRatio, Box, createStyles, Title } from '@mantine/core';
import { useSlide } from 'hooks/api/slide';
import { useBackgroundColor } from 'hooks/use-background-color';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { QuestionWithContentAndOwnerAndCategoriesAndMode } from 'types/question';

interface Props {
  question: QuestionWithContentAndOwnerAndCategoriesAndMode;
}

export const MainSlideNew = ({ question }: Props) => {
  const router = useRouter();
  const { slideId } = router.query;

  const { data: slide } = useSlide(slideId as string);

  useEffect(() => {
    console.log(slide);
  }, [slide]);

  const { classes } = useStyles();
  const { backgroundColor } = useBackgroundColor();

  return (
    <AspectRatio ratio={16 / 9}>
      <Box className={classes.box} style={{ backgroundColor }}>
        {question && (
          <Box>
            <Title order={2}>Question text?</Title>
          </Box>
        )}
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
