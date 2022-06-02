import { StatRing, StatsRing } from 'components/Stats/StatsRing';
import {
    useCurrentOrganizationInfo,
    useOrganization
} from 'hooks/api/organizations';
import { paths } from 'paths';
import { isNumber } from 'util';

export const DashboardQwizStats = (props) => {
  const { data: me, isLoading: isMeLoading } = useCurrentOrganizationInfo();
  const { data: organization, isLoading: isOrgLoading } = useOrganization(
    me?.id ?? null
  );

  const loading = isMeLoading || isOrgLoading;

  const count = organization?._count;
  const eventCount = count?.events;
  const quizCount = count?.quizzes;
  const questionCount = count?.questions;

  const calcProgress = (n?: number) => {
    if (isNumber(n)) {
      if (n > 0 && n < 10) {
        return n * 8;
      }
      if (n > 10) {
        return n * 7;
      }
    }
    return 10;
  };

  const eventStatsData: StatRing[] = [
    {
      label: 'Events organized',
      stats: `${eventCount} events`,
      progress: calcProgress(eventCount),
      color: 'blue',
      icon: 'event',
      path: paths.events(),
    },
    {
      label: 'Quizzes built',
      stats: `${quizCount} quizzes`,
      progress: calcProgress(quizCount),
      color: 'orange',
      icon: 'quiz',
      path: paths.quiz(),
    },
    {
      label: 'Questions created',
      stats: `${questionCount} questions`,
      progress: calcProgress(questionCount),
      color: 'red',
      icon: 'question',
      path: paths.questions(),
    },
  ];

  return <StatsRing data={eventStatsData} loading={loading} />;
};

