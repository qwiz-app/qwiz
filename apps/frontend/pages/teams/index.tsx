import { Button, Skeleton } from '@mantine/core';
import { ImageCard } from 'components/Cards/event/EventCard';
import { FramerAnimatedListItem } from 'components/Framer/FramerAnimatedListItem';
import PageGrid from 'components/Grids/PageGrid';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import { HomepageLayout } from 'components/PageLayouts/HomepageLayout';
import { PageSection } from 'components/PageLayouts/PageSection';
import { NoTeamsAlert } from 'components/Team/NoTeamsAlert';
import TeamCard from 'components/Team/TeamCard';
import { useTeams } from 'hooks/api/teams';
import { useBreakpoints } from 'hooks/breakpoints';
import { generateArrayForRange } from 'lib/utils';
import { useRouter } from 'next/router';
import { paths } from 'paths';
import { PlusCircle } from 'phosphor-react';
import { useEffect, useMemo } from 'react';

const TeamsPage = (props) => {
  const router = useRouter();
  const { matches } = useBreakpoints();
  const { data: teams, isLoading: isTeamsLoading } = useTeams();

  const navigateToTeamCreate = () => {
    router.push(paths.teamNew());
  };

  const teamEvents = useMemo(() => {
    return (
      teams
        ?.map((t) => {
          console.log(t);
          return t.eventTeams.map((ev) => ev.event);
        })
        ?.flat() ?? []
    );
  }, [teams]);

  const hasTeams = teams?.length > 0;

  useEffect(() => {
    console.log(teamEvents);
  }, [teamEvents]);

  const hasTeamEvents = teamEvents?.length > 0;

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
            teams?.map((team) => (
              <FramerAnimatedListItem key={team.id} id={team.id}>
                <TeamCard team={team} />
              </FramerAnimatedListItem>
            ))}
        </PageGrid>
        {!hasTeams && !isTeamsLoading && <NoTeamsAlert />}
      </PageSection>
      {hasTeamEvents && (
        <PageSection
          title="Your team events"
          description="All the events you signed up for"
        >
          <PageGrid type="event">
            {teamEvents?.map((event) => (
              <ImageCard
                // TODO What if multiple teams signed up for the same event?
                key={`team-${event.id}`}
                event={event}
                loading={false}
              />
            ))}
          </PageGrid>
        </PageSection>
      )}
    </HomepageLayout>
  );
};

export default TeamsPage;

TeamsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
