import {
  Avatar,
  Box,
  Card,
  Center,
  createStyles,
  Group,
  Skeleton,
  Text,
  Tooltip
} from '@mantine/core';
import cn from 'classnames';
import { useAppColorscheme } from 'hooks/colorscheme';
import { formatCurrency, formatDate, relativeTimeTo } from 'lib/utils';
import Link from 'next/link';
import { paths } from 'paths';
import { Tag, UsersThree } from 'phosphor-react';
import { EventWithOwner } from 'types/api/event';
import { useCardStyles } from '../use-card-styles';

interface Props {
  event: EventWithOwner;
  loading: boolean;
}

export const ImageCard = ({ event, loading }: Props) => {
  const { classes, theme } = useStyles();
  const { classes: classesCard } = useCardStyles();

  return (
    <Skeleton className={classes.base} radius="md" visible={loading}>
      <Link href={paths.eventPage(event.id)} passHref>
        <Card
          p="lg"
          shadow="md"
          className={cn(classes.base, classes.card, classesCard.card)}
        >
          <Box
            // TODO: placeholder gradient or something
            className={classes.image}
            style={{
              backgroundImage: `url(${event.banner})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Box className={classes.overlay} />

          <Box className={classes.contentWrapper}>
            {/* <Box></Box> */}

            <Box className={classes.content}>
              <Group position="apart">
                <Text
                  size="lg"
                  className={classes.title}
                  weight={500}
                  lineClamp={2}
                >
                  {event.name}
                </Text>
                <Tooltip withArrow label={formatDate(event.startDate)}>
                  <Text size="xs" color="dimmed">
                    {relativeTimeTo(event.startDate)}
                  </Text>
                </Tooltip>
              </Group>

              <Group position="apart" spacing="xs" noWrap>
                <Link href={paths.organizationPage(event.ownerId)}>
                  <Group spacing={0} noWrap>
                    <Avatar
                      // TODO: placeholder
                      src={event.owner.user.image}
                      size={20}
                      radius="xl"
                      mr="xs"
                    />
                    <Text size="sm" className={classes.owner} lineClamp={1}>
                      {event.owner.name}
                    </Text>
                  </Group>
                </Link>

                <Group
                  spacing="lg"
                  noWrap
                  sx={() => ({
                    flexShrink: 0,
                  })}
                >
                  <Tooltip withArrow label="Price per team">
                    <Center>
                      <Tag
                        size={16}
                        weight="bold"
                        color={theme.colors.dark[2]}
                      />
                      <Text size="sm" className={classes.bodyText}>
                        {formatCurrency(event.price, event.currency)}
                      </Text>
                    </Center>
                  </Tooltip>
                  <Tooltip withArrow label="Teams">
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
            </Box>
          </Box>
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

    contentWrapper: {
      height: '100%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      zIndex: 1,
      marginTop: 'auto',
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
