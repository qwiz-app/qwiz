import {
  Card,
  Center,
  createStyles,
  Group,
  Skeleton,
  Text,
  Tooltip,
} from '@mantine/core';
import Link from 'next/link';
import { Tag, UsersThree } from 'phosphor-react';
import cn from 'classnames';

interface Props {
  link: string;
  image: string;
  title: string;
  owner: string;
  teams: number;
  price: number;
  currency: string;
  loading?: boolean;
}

export const ImageCard = ({
  link,
  image,
  title,
  owner,
  teams,
  currency,
  price,
  loading,
}: Props) => {
  const { classes, theme } = useStyles();

  return loading ? (
    <Skeleton className={classes.base} radius="md" />
  ) : (
    <Link href={link} passHref>
      <Card p="lg" shadow="md" className={cn(classes.base, classes.card)}>
        <div
          className={classes.image}
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className={classes.overlay} />

        <div className={classes.content}>
          <Text size="lg" className={classes.title} weight={500}>
            {title}
          </Text>

          <Group position="apart" spacing="xs">
            <Text size="sm" className={classes.owner}>
              {owner}
            </Text>

            <Group spacing="lg">
              <Tooltip label="Price per team">
                <Center>
                  <Tag size={16} weight="bold" color={theme.colors.dark[2]} />
                  <Text size="sm" className={classes.bodyText}>
                    {currency}
                    {price}
                  </Text>
                </Center>
              </Tooltip>
              <Tooltip label="Teams">
                <Center>
                  <UsersThree
                    size={16}
                    weight="bold"
                    color={theme.colors.dark[2]}
                  />
                  <Text size="sm" className={classes.bodyText}>
                    {teams}
                  </Text>
                </Center>
              </Tooltip>
            </Group>
          </Group>
        </div>
      </Card>
    </Link>
  );
};

const useStyles = createStyles((theme, _params, getRef) => {
  const image = getRef('image');

  return {
    base: {
      aspectRatio: '16/10',
      borderRadius: theme.radius.md,
    },

    card: {
      position: 'relative',
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      cursor: 'pointer',

      [`&:hover .${image}`]: {
        transform: 'scale(1.03)',
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

    overlay: {
      position: 'absolute',
      top: '20%',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage:
        'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)',
    },

    content: {
      height: '100%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      zIndex: 1,
    },

    title: {
      color: theme.white,
      marginBottom: 5,
    },

    bodyText: {
      color: theme.colors.dark[2],
      marginLeft: 7,
    },

    owner: {
      color: theme.colors.dark[2],
    },
  };
});
