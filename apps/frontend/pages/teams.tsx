import { Skeleton } from '@mantine/core';
import PageGrid from 'components/Grids/PageGrid';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import { HomepageLayout } from 'components/PageLayouts/HomepageLayout';
import { PageSection } from 'components/PageLayouts/PageSection';
import TeamCard from 'components/Team/TeamCard';
import { useTeams } from 'hooks/api/teams';
import { generateArrayForRange } from 'lib/utils';

const TeamsPage = (props) => {
  const { data: teams, isLoading: isTeamsLoading } = useTeams();

  return (
    <HomepageLayout>
      <PageSection title="Your teams" description="All the teams you manage">
        <PageGrid type="teams">
          {isTeamsLoading &&
            generateArrayForRange(3).map((n) => (
              <Skeleton
                visible
                key={n}
                sx={{ width: '100%', height: 164 }}
                radius="md"
              />
            ))}
          {!isTeamsLoading &&
            teams &&
            teams?.map((team) => <TeamCard team={team} key={team.id} />)}
        </PageGrid>
      </PageSection>
    </HomepageLayout>
  );
};

export default TeamsPage;

TeamsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
