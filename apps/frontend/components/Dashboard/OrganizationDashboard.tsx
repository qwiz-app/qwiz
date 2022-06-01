// import { createStyles } from '@mantine/core';
import { PageSection } from 'components/PageLayouts/PageSection';
import { StatsGroup } from 'components/Stats/StatsGroup';
import {
  StatRing,
  StatsRing
} from 'components/Stats/StatsRing';
import { DashboardHero } from './DashboardHero';

export const OrganizationDashboard = (props) => {
  // const { classes } = useStyles();

  const data = [
    {
      title: 'Page views',
      stats: '456,133',
      description:
        '24% more than in the same month last year, 33% more that two years ago',
    },
    {
      title: 'New users',
      stats: '2,175',
      description:
        '13% less compared to last month, new user engagement up by 6%',
    },
    {
      title: 'Completed orders',
      stats: '1,994',
      description:
        '1994 orders were completed this month, 97% satisfaction rate',
    },
  ];

  const eventStatsData: StatRing[] = [
    {
      label: 'test',
      stats: 'test',
      progress: 52,
      color: 'blue',
      icon: 'up',
    },
    {
      label: 'test',
      stats: 'test',
      progress: 67,
      color: 'orange',
      icon: 'up',
    },
    {
      label: 'test',
      stats: 'test',
      progress: 24,
      color: 'red',
      icon: 'down',
    },
  ];

  return (
    <>
      <PageSection title="Dashboard">
        <DashboardHero />
      </PageSection>
      <PageSection>
        <StatsGroup data={data} />
      </PageSection>
      <PageSection
        title="Event stats"
        description="Your event stats on a glance"
      >
        <StatsRing data={eventStatsData} />
      </PageSection>
    </>
  );
};

// const useStyles = createStyles((theme, _params, getRef) => {
//   return {
//     // TODO
//     test: {},
//   };
// });
