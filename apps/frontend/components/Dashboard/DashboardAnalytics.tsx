import { StatsGroup } from 'components/Stats/StatsGroup';

export const DashboardAnalytics = (props) => {
  const data = [
    {
      title: 'Page views',
      stats: '2,493',
      description:
        '24% more than in the same month last year, 33% more that two years ago',
    },
    {
      title: 'New users',
      stats: '463',
      description:
        '13% less compared to last month, new user engagement up by 6%',
    },
    {
      title: 'Completed reservations',
      stats: '112',
      description:
        '112 atendees reserved events this month, 97% satisfaction rate',
    },
  ];

  return <StatsGroup loading={false} data={data} />;
};
