import { Skeleton } from '@mantine/core';
import { useEventsPage } from 'components/Event/EventPage/use-events-page';
import PageGrid from 'components/Grids/PageGrid';
import { PageSection } from 'components/PageLayouts/PageSection';
import { useAllEvents } from 'hooks/api/events';
import { useCurrentUser } from 'hooks/api/users';

const DashboardEvents = (props) => {
  const { isLoading, isSessionLoading } = useCurrentUser();
  const {
    hasEvents,
    isLoadingOrPlaceholder,
    highlightedEvents,
    highlightedPlaceholderSkeletons,
    renderEvents,
  } = useEventsPage(useAllEvents());

  const loading = isLoading || isSessionLoading || isLoadingOrPlaceholder;

  return (
    (hasEvents || loading) && (
      <PageSection
        title={
          !isLoadingOrPlaceholder ? (
            'Events for you'
          ) : (
            <Skeleton height={40} radius="sm" />
          )
        }
        description={!isLoadingOrPlaceholder && "Events you're gonna love"}
      >
        <PageGrid type="eventHighlight">
          {loading
            ? highlightedPlaceholderSkeletons
            : renderEvents(highlightedEvents, true)}
        </PageGrid>
      </PageSection>
    )
  );
};

export default DashboardEvents;
