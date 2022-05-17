import { Button } from '@mantine/core';
import { NoEventsAlert } from 'components/Cards/event/NoEventsAlert';
import PageGrid from 'components/Grids/PageGrid';
import { PageSection } from 'components/PageLayouts/PageSection';
import { useEvents } from 'hooks/api/events';
import { useAppColorscheme } from 'hooks/colorscheme';
import { useRouter } from 'next/router';
import { PlusCircle } from 'phosphor-react';
import { useEventsPage } from './use-events-page';
import { EventCreateCard } from '../../Cards/event/EventCreateCard';

export const EventsCurrentOrganization = () => {
  const {
    hasEvents,
    isLoadingOrPlaceholder,
    activeEvents,
    pastEvents,
    highlightedEvents,
    placeholderSkeletons,
    highlightedPlaceholderSkeletons,
    renderEvents,
  } = useEventsPage(useEvents());

  const { isDark } = useAppColorscheme();
  const router = useRouter();

  return (
    <>
      {(hasEvents || isLoadingOrPlaceholder) && (
        <PageSection
          title="Highlighted event"
          rightSlot={
            hasEvents &&
            !isLoadingOrPlaceholder && (
              <Button
                ml="auto"
                color="indigo"
                variant={isDark ? 'light' : 'filled'}
                rightIcon={<PlusCircle size={20} weight="duotone" />}
                size="md"
                onClick={() => router.push('/events/create')}
              >
                Create an event
              </Button>
            )
          }
        >
          <PageGrid type="big">
            {isLoadingOrPlaceholder
              ? highlightedPlaceholderSkeletons
              : renderEvents(highlightedEvents, true)}
          </PageGrid>
        </PageSection>
      )}
      <PageSection
        title="Your events"
        description="All of your incoming events"
      >
        <PageGrid type="small">
          <EventCreateCard />
          {isLoadingOrPlaceholder
            ? placeholderSkeletons
            : renderEvents(activeEvents)}
        </PageGrid>
        {!hasEvents && <NoEventsAlert />}
      </PageSection>
      {hasEvents && (
        <PageSection
          title="Past events"
          description="All of your finished events"
        >
          <PageGrid type="small">
            {isLoadingOrPlaceholder
              ? placeholderSkeletons
              : renderEvents(pastEvents)}
          </PageGrid>
          {!hasEvents && <NoEventsAlert />}
        </PageSection>
      )}
    </>
  );
};
