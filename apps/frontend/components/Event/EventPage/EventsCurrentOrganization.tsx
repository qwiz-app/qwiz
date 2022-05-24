import { Button } from '@mantine/core';
import { NoEventsAlert } from 'components/Cards/event/NoEventsAlert';
import PageGrid from 'components/Grids/PageGrid';
import { PageSection } from 'components/PageLayouts/PageSection';
import { useEvents } from 'hooks/api/events';
import { useAppColorscheme } from 'hooks/colorscheme';
import { useCreateEventCheck } from 'hooks/use-create-event-check';
import { PlusCircle } from 'phosphor-react';
import { useEventsPage } from './use-events-page';

export const EventsCurrentOrganization = () => {
  const { isDark } = useAppColorscheme();
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
  const { navigateToCreateEvent } = useCreateEventCheck();

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
                color="orange"
                variant={isDark ? 'light' : 'filled'}
                rightIcon={<PlusCircle size={20} weight="duotone" />}
                size="md"
                onClick={navigateToCreateEvent}
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
          {isLoadingOrPlaceholder
            ? placeholderSkeletons
            : renderEvents(activeEvents)}
        </PageGrid>
        {!hasEvents && <NoEventsAlert />}
      </PageSection>
      {pastEvents?.length > 0 && (
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
