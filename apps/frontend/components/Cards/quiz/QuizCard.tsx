import React from 'react';
import { Bookmark, Globe, Heart, Share, Lock } from 'phosphor-react';
import {
  Card,
  Text,
  ActionIcon,
  Group,
  Center,
  Avatar,
  createStyles,
  ThemeIcon,
  Image,
} from '@mantine/core';
import { User } from '@prisma/client';
import Link from 'next/link';
import { useAppColorscheme } from 'hooks/colorscheme';

interface QuizCardProps {
  image: string;
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
        p={0}
        radius="md"
        withBorder
        className={cx(classes.card, className)}
        {...others}
      >
        <Card.Section className={classes.imageSection}>
          <Image
            src={image}
            withPlaceholder
            alt="thumbnail"
            height="100%"
            fit="cover"
            styles={{
              root: { height: '100%' },
              imageWrapper: { height: '100%' },
              figure: { height: '100%' },
            }}
          />

          {/* TODO: tooltip */}
          <ThemeIcon variant="filled" className={classes.accessBadge} size="md">
            {published ? <Globe weight="duotone" /> : <Lock weight="duotone" />}
          </ThemeIcon>
        </Card.Section>

        <Card.Section py={12} px={18}>
          <Text className={classes.title} weight={500}>
            {title}
          </Text>

          <Group position="apart" mt={6}>
            <Center>
              <Avatar src={author?.image} size={20} radius="xl" mr="xs" />
              <Text size="xs" inline>
                {author?.name}
              </Text>
            </Center>

            <Group spacing={8} mr={0}>
              <ActionIcon
                variant="hover"
                onClick={(e: any) => {
                  e.preventDefault();
                }}
              >
                <Heart size={16} weight="duotone" />
              </ActionIcon>
              <ActionIcon
                variant="hover"
                onClick={(e: any) => {
                  e.preventDefault();
                }}
              >
                <Bookmark size={16} weight="duotone" />
              </ActionIcon>
              <ActionIcon
                variant="hover"
                onClick={(e: any) => {
                  e.preventDefault();
                }}
              >
                <Share size={16} weight="duotone" />
              </ActionIcon>
            </Group>
          </Group>
        </Card.Section>
      </Card>
    </Link>
  );
};

const useStyles = createStyles((theme) => {
  const { isDark } = useAppColorscheme();

  return {
    card: {
      position: 'relative',
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      transition: 'all 250ms',

      '&:hover': {
        boxShadow: theme.shadows.xl,
      },
    },

    imageSection: {
      position: 'relative',
      aspectRatio: '16/9',
      width: '100%',
      overflow: 'hidden',
      borderBottom: '1px solid',
      borderColor: isDark ? theme.colors.dark[6] : theme.colors.gray[2],
    },

    accessBadge: {
      position: 'absolute',
      bottom: theme.spacing.xs,
      right: theme.spacing.xs + 2,
      pointerEvents: 'none',
    },

    title: {
      display: 'block',
    },
  };
});
