import { Card, Center, createStyles, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import { Plus } from 'phosphor-react';
import React from 'react';

interface TemplateProps {
  href: string;
  image: string;
  label: string;
}

interface NewProps {
  onClick: () => void;
}

export const Template = ({
  onClick,
  image,
  label,
  ...rest
}: TemplateProps &
  Omit<React.ComponentPropsWithoutRef<'div'>, keyof TemplateProps>) => {
  const { classes } = useStyles();

  return (
    <Link href="href">
      <Stack spacing={8}>
        <Card
          radius="md"
          withBorder
          className={classes.card}
          onClick={onClick}
          {...rest}
        >
          <div
            className={classes.image}
            style={{ backgroundImage: `url(${image})` }}
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
  ...rest
}: NewProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof NewProps>) => {
  const { classes } = useStyles();

  return (
    <Stack spacing={8}>
      <Card
        radius="md"
        withBorder
        className={classes.card}
        onClick={onClick}
        {...rest}
      >
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
      position: 'relative',
      aspectRatio: '16/9',
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      transition: 'all 250ms',

      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.dark[0],
      cursor: 'pointer',

      '&:hover': {
        boxShadow: theme.shadows.xl,
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
