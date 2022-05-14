import {
  Avatar,
  Card,
  Center,
  createStyles,
  Group,
  Skeleton,
  Text,
  Tooltip,
} from '@mantine/core';
import cn from 'classnames';
import { useAppColorscheme } from 'hooks/colorscheme';
import Link from 'next/link';
import { Tag, UsersThree } from 'phosphor-react';
import { EventWithOrganization } from 'types/event';
import { useCardStyles } from '../use-card-styles';

interface Props {
  event: EventWithOrganization;
  loading: boolean;
}

export const ImageCard = ({ event, loading }: Props) => {
  const { classes, theme } = useStyles();
  const { classes: classesCard } = useCardStyles();

  return (
    <Skeleton className={classes.base} radius="md" visible={loading}>
      <Link href={`/events/${event.id}`} passHref>
        <Card
          p="lg"
          shadow="md"
          className={cn(classes.base, classes.card, classesCard.card)}
        >
          <div
            // TODO: placeholder gradient or something
            className={classes.image}
            style={{
              backgroundImage: `url(${event.banner})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className={classes.overlay} />

          <div className={classes.content}>
            <Text size="lg" className={classes.title} weight={500}>
              {event.name}
            </Text>

            <Group position="apart" spacing="xs">
              <Link href={`/organization/${event.ownerId}`}>
                <Group spacing={0}>
                  <Avatar
                    // TODO: placeholder
                    src={event.owner.user.image}
                    size={20}
                    radius="xl"
                    mr="xs"
                  />
                  <Text size="sm" className={classes.owner}>
                    {event.owner.name}
                  </Text>
                </Group>
              </Link>

              <Group spacing="lg">
                <Tooltip label="Price per team">
                  <Center>
                    <Tag size={16} weight="bold" color={theme.colors.dark[2]} />
                    <Text size="sm" className={classes.bodyText}>
                      {/* TODO: currencz */}
                      {/* {event.currency} */} ${event.price}
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
                      {event.teamCount}
                    </Text>
                  </Center>
                </Tooltip>
              </Group>
            </Group>
          </div>
        </Card>
      </Link>
    </Skeleton>
  );
};

const useStyles = createStyles((t, _params, getRef) => {
  const { isDark } = useAppColorscheme();
  const image = getRef('image');

  return {
    base: {
      aspectRatio: '17/11',
      borderRadius: t.radius.md,
    },

    card: {
      position: 'relative',

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
      background: isDark ? t.colors.dark[6] : t.colors.gray[7],
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
      color: t.white,
      marginBottom: 5,
    },

    bodyText: {
      color: t.colors.dark[2],
      marginLeft: 7,
    },

    owner: {
      color: t.colors.dark[2],
    },
  };
});
