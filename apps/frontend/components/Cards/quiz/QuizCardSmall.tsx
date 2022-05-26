import {
  Box,
  Card,
  Center,
  createStyles,
  LoadingOverlay,
  Stack,
  Text,
} from '@mantine/core';
import cn from 'classnames';
import Link from 'next/link';
import { Plus } from 'phosphor-react';
import React from 'react';
import { useCardStyles } from '../use-card-styles';

interface TemplateProps {
  href: string;
  image: any;
  label: string;
  loading?: boolean;
}

interface NewProps {
  onClick: () => void;
  loading?: boolean;
}

export const Template = ({
  onClick,
  loading,
  image,
  label,
  ...rest
}: TemplateProps &
  Omit<React.ComponentPropsWithoutRef<'div'>, keyof TemplateProps>) => {
  const { classes } = useStyles();
  const { classes: classesCard } = useCardStyles();

  return (
    <Link href="/quiz">
      <Stack spacing={8}>
        <Card
          radius="md"
          withBorder
          className={cn(classesCard.card, classes.card)}
          onClick={onClick}
          {...rest}
        >
          <LoadingOverlay visible={loading} />
          <Box
            className={classes.image}
            style={{
              backgroundImage: `url(${image.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </Card>
        <Text weight={600} ml={4}>
          {label}
        </Text>
      </Stack>
    </Link>
  );
};

export const New = ({
  onClick,
  loading,
  ...rest
}: NewProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof NewProps>) => {
  const { classes } = useStyles();
  const { classes: classesCard } = useCardStyles();

  return (
    <Stack spacing={8}>
      <Card
        radius="md"
        withBorder
        className={cn(classesCard.card, classes.card)}
        onClick={onClick}
        {...rest}
      >
        <LoadingOverlay visible={loading} />
        <Center sx={() => ({ height: '100%' })}>
          <Plus size={40} weight="duotone" />
        </Center>
      </Card>
      <Text weight={600} ml={4}>
        Blank
      </Text>
    </Stack>
  );
};

const useStyles = createStyles((theme, params, getRef) => {
  const image = getRef('image');

  return {
    card: {
      aspectRatio: '16/9',
      cursor: 'pointer',

      '&:hover': {
        background:
          theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
      },
    },

    image: {
      ref: image,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundSize: 'cover',
      transition: 'transform 500ms ease',
    },
  };
});

export const QuizCardSmall = {
  New,
  Template,
};
