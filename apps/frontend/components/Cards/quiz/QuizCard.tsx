import {
  ActionIcon,
  Avatar,
  Card,
  Center,
  createStyles,
  Group,
  Image,
  Skeleton,
  Text,
  ThemeIcon,
} from '@mantine/core';
import { useAppColorscheme } from 'hooks/colorscheme';
import { generateRandomNumber } from 'lib/utils';
import Link from 'next/link';
import { Bookmark, Globe, Heart, Lock, Share } from 'phosphor-react';
import React, { SyntheticEvent, useState } from 'react';
import { OrganizationWithUser } from 'types/organization';

interface QuizCardProps {
  image: string;
  href: string;
  title: string;
  published: boolean;
  owner: OrganizationWithUser;
  loading: boolean;
}

export const QuizCard = ({
  className,
  image,
  href,
  title,
  owner,
  published,
  loading,
  ...others
}: QuizCardProps &
  Omit<React.ComponentPropsWithoutRef<'div'>, keyof QuizCardProps>) => {
  const { classes, cx } = useStyles();

  const [randomNumber] = useState(() => generateRandomNumber({ from: 60, to: 100 }));

  return (
    <Link href={href}>
      <Card
        p={0}
        radius="md"
        withBorder
        className={cx(classes.card, className)}
        {...others}
      >
        <Card.Section className={classes.imageSection}>
          <Skeleton visible={loading} radius={0} height="100%">
            {!loading && (
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
            )}
          </Skeleton>

          {/* TODO: tooltip */}
          <ThemeIcon variant="filled" className={classes.accessBadge} size="md">
            {published ? <Globe weight="duotone" /> : <Lock weight="duotone" />}
          </ThemeIcon>
        </Card.Section>
        <Card.Section py={12} px={18}>
          <Skeleton visible={loading} width={`${randomNumber}%`}>
            <Text className={classes.title} weight={500}>
              {title}
            </Text>
          </Skeleton>

          <Group position="apart" mt={6}>
            <Center>
              <Skeleton
                visible={loading}
                circle
                height={20}
                sx={() => ({ flexShrink: 0 })}
                mr="xs"
              >
                {!loading && (
                  <Avatar
                    src={owner.user.image}
                    size={20}
                    radius="xl"
                    mr="xs"
                  />
                )}
              </Skeleton>
              {/* TODO: skeleton not showing */}
              <Skeleton visible={loading}>
                <Text size="xs" inline className={classes.owner}>
                  {owner?.name}
                </Text>
              </Skeleton>
            </Center>

            <Group spacing={8} mr={0}>
              <ActionIcon
                className={classes.icon1}
                variant="hover"
                onClick={(e: SyntheticEvent) => {
                  e.preventDefault();
                }}
              >
                <Heart size={16} weight="duotone" />
              </ActionIcon>
              <ActionIcon
                className={classes.icon2}
                variant="hover"
                onClick={(e: SyntheticEvent) => {
                  e.preventDefault();
                }}
              >
                <Bookmark size={16} weight="duotone" />
              </ActionIcon>
              <ActionIcon
                className={classes.icon3}
                variant="hover"
                onClick={(e: SyntheticEvent) => {
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
      cursor: 'default',
    },

    owner: {
      cursor: 'pointer',
    },

    icon1: {
      '&:hover': {
        color: theme.colors.red[5],
      },
    },

    icon2: {
      '&:hover': {
        color: theme.colors.orange[5],
      },
    },

    icon3: {
      '&:hover': {
        color: theme.colors.blue[5],
      },
    },
  };
});
