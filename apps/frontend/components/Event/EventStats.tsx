import { Grid, Group } from '@mantine/core';
import { useAppColorscheme } from 'hooks/colorscheme';
import {
  Calendar,
  ClockAfternoon, IconProps, MapPin, Tag, UsersFour
} from 'phosphor-react';
import { EventStat } from './EventStat';

const EventStats = (props) => {
  const { theme, isDark } = useAppColorscheme();
  const iconProps: IconProps = {
    size: 32,
    weight: 'duotone',
  };

  const eventStats = [
    {
      label: 'Date',
      value: 'June 6th',
      icon: (
        <Calendar
          {...iconProps}
          color={isDark ? theme.colors.indigo[4] : 'currentColor'}
        />
      ),
    },
    {
      label: 'Time',
      value: '19:00',
      icon: (
        <ClockAfternoon
          {...iconProps}
          color={isDark ? theme.colors.orange[4] : 'currentColor'}
        />
      ),
    },
    {
      label: 'Teams',
      value: '22',
      icon: (
        <UsersFour
          {...iconProps}
          color={isDark ? theme.colors.teal[4] : 'currentColor'}
        />
      ),
    },
    {
      label: 'Price per team',
      value: '$12',
      icon: (
        <Tag
          {...iconProps}
          color={isDark ? theme.colors.red[4] : 'currentColor'}
        />
      ),
    },
    {
      label: 'Location',
      value: 'Sesvete',
      icon: (
        <MapPin
          {...iconProps}
          color={isDark ? theme.colors.blue[4] : 'currentColor'}
        />
      ),
    },
  ];
  return (
    <Group mt={16}>
      <Grid
        columns={15}
        sx={(t) => ({
          flex: 1,
        })}
      >
        {eventStats.map((stat) => (
          <Grid.Col key={stat.label} span={3}>
            <EventStat {...stat} />
          </Grid.Col>
        ))}
      </Grid>
    </Group>
  );
};

export default EventStats;
