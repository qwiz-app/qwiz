import React from 'react';
import { Bookmark, Globe, Heart, Share, Lock } from 'phosphor-react';
import {
  Card,
  Image,
  Text,
  ActionIcon,
  Badge,
  Group,
  Center,
  Avatar,
  createStyles,
} from '@mantine/core';
import { User } from '@prisma/client';
import Link from 'next/link';
import { useAppColorscheme } from 'hooks/colorscheme';

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  rating: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: theme.spacing.xs + 2,
    pointerEvents: 'none',
    padding: theme.spacing.xs,
  },

  title: {
    display: 'block',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs / 2,
  },

  action: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
  },

  footer: {
    marginTop: theme.spacing.xs,
  },
}));

interface QuizCardProps {
  image?: string;
  link: string;
  title: string;
  published: boolean;
  author: User;
  loading: boolean;
}

export const QuizCard = ({
  className,
  image,
  link,
  title,
  author,
  published,
  loading,
  ...others
}: QuizCardProps &
  Omit<React.ComponentPropsWithoutRef<'div'>, keyof QuizCardProps>) => {
  const { classes, cx } = useStyles();
  const { theme } = useAppColorscheme();

  return (
    <Link href={link}>
      <Card
        withBorder
        radius="sm"
        className={cx(classes.card, className)}
        {...others}
      >
        <Card.Section>
          <Image src={image} height={180} />
        </Card.Section>

        <Badge className={classes.rating} variant="filled">
          {published ? (
            <Globe size={18} weight="duotone" />
          ) : (
            <Lock size={18} weight="duotone" />
          )}
        </Badge>

        <Text className={classes.title} weight={500}>
          {title}
        </Text>

        <Group position="apart" className={classes.footer}>
          <Center>
            <Avatar src={author?.image} size={24} radius="xl" mr="xs" />
            <Text size="sm" inline>
              {author?.name}
            </Text>
          </Center>

          <Group spacing={8} mr={0}>
            <ActionIcon
              className={classes.action}
              style={{ color: theme.colors.red[6] }}
            >
              <Heart size={16} />
            </ActionIcon>
            <ActionIcon
              className={classes.action}
              style={{ color: theme.colors.yellow[7] }}
            >
              <Bookmark size={16} />
            </ActionIcon>
            <ActionIcon className={classes.action}>
              <Share size={16} />
            </ActionIcon>
          </Group>
        </Group>
      </Card>
    </Link>
  );
};
