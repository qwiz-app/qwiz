import { Button, Skeleton } from '@mantine/core';
import PageGrid from 'components/Grids/PageGrid';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import { HomepageLayout } from 'components/PageLayouts/HomepageLayout';
import { PageSection } from 'components/PageLayouts/PageSection';
import { NoTeamsAlert } from 'components/Team/NoTeamsAlert';
import TeamCard from 'components/Team/TeamCard';
import { useTeams } from 'hooks/api/teams';
import { useBreakpoints } from 'hooks/breakpoints';
import { generateArrayForRange } from 'lib/utils';
import { PlusCircle } from 'phosphor-react';

const TeamsPage = (props) => {
  const { data: teams, isLoading: isTeamsLoading } = useTeams();
  const { matches } = useBreakpoints();

  const navigateToTeamCreate = () => {
    console.log('team create');
  };

  const hasTeams = teams?.length;

  return (
    <HomepageLayout>
      <PageSection
        title="Your teams"
        description="All the teams you manage"
        rightSlot={
          !isTeamsLoading && (
            <Button
              ml="auto"
              rightIcon={<PlusCircle size={20} weight="duotone" />}
              size="md"
              onClick={navigateToTeamCreate}
              fullWidth={matches.max.sm}
            >
              Create your team
            </Button>
          )
        }
      >
        <PageGrid type="teams">
          {isTeamsLoading &&
            generateArrayForRange(3).map((n) => (
              <Skeleton
                visible
                key={n}
                sx={{ width: '100%', height: matches.max.sm ? 175 : 164 }}
                radius="md"
              />
            ))}
          {hasTeams &&
            !isTeamsLoading &&
            teams?.map((team) => <TeamCard team={team} key={team.id} />)}
        </PageGrid>
        {!hasTeams && !isTeamsLoading && <NoTeamsAlert />}
      </PageSection>
    </HomepageLayout>
  );
};

export default TeamsPage;

TeamsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
