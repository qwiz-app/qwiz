import { Box, createStyles, Skeleton } from '@mantine/core';
import { useAppColorscheme } from 'hooks/colorscheme';
import { DateTimeFormat, formatCurrency, formatDate } from 'lib/utils';
import {
  Calendar,
  ClockAfternoon,
  IconProps,
  MapPin,
  Tag,
  UsersFour
} from 'phosphor-react';
import { EventWithOrganization } from 'types/event';
import { EventStat } from './EventStat';

interface Props {
  event: EventWithOrganization;
  loading: boolean;
}

const EventStats = ({ event, loading }: Props) => {
  const { theme, isDark } = useAppColorscheme();
  const iconProps: IconProps = {
    size: 32,
    weight: 'duotone',
  };

  const { classes } = useStyles();

  const eventStats = [
    {
      label: 'Date',
      value: formatDate(event.startDate, DateTimeFormat.DATE_NO_YEAR),
      icon: (
        <Calendar
          {...iconProps}
          color={isDark ? theme.colors.indigo[4] : 'currentColor'}
        />
      ),
    },
    {
      label: 'Time',
      value: formatDate(event.startDate, DateTimeFormat.TIME),
      icon: (
        <ClockAfternoon
          {...iconProps}
          color={isDark ? theme.colors.orange[4] : 'currentColor'}
        />
      ),
    },
    {
      label: 'Teams',
      value: event.teamCount.toString(),
      icon: (
        <UsersFour
          {...iconProps}
          color={isDark ? theme.colors.teal[4] : 'currentColor'}
        />
      ),
    },
    {
      label: 'Price per team',
      value: formatCurrency(event.price, event.currency),
      icon: (
        <Tag
          {...iconProps}
          color={isDark ? theme.colors.red[4] : 'currentColor'}
        />
      ),
    },
    {
      label: 'Location',
      value: event.location,
      icon: (
        <MapPin
          {...iconProps}
          color={isDark ? theme.colors.blue[4] : 'currentColor'}
        />
      ),
    },
  ];

  return (
    <Box className={classes.grid}>
      {eventStats.map((stat) => (
        <Skeleton visible={loading} radius="md" key={stat.label}>
          <EventStat {...stat} />
        </Skeleton>
      ))}
    </Box>
  );
};

const useStyles = createStyles(() => ({
  grid: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: 16,
  },
}));

export default EventStats;
