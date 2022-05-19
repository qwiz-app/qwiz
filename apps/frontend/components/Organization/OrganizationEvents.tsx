import { ImageCard } from 'components/Cards/event/EventCard';
import { FramerAnimatedListItem } from 'components/Framer/FramerAnimatedListItem';
import PageGrid from 'components/Grids/PageGrid';
import { PageSection } from 'components/PageLayouts/PageSection';
import { useMemo } from 'react';
import { EventWithOrganization } from 'types/event';

interface Props {
  events: EventWithOrganization[];
  loading: boolean;
}
const OrganizationEvents = ({ events, loading }: Props) => {
  const renderEvents = (arr: EventWithOrganization[]) =>
    arr?.map((event) => (
      <FramerAnimatedListItem id={event.id} key={event.id}>
        <ImageCard event={event} loading={loading} />
      </FramerAnimatedListItem>
    ));

  const placeholderSkeletons = useMemo(
    () =>
      events?.map((event) => (
        <FramerAnimatedListItem id={event.id} key={event.id}>
          <ImageCard event={event} loading={loading} />
        </FramerAnimatedListItem>
      )),
    [events]
  );

  return (
    <PageSection title="All events" description="All of their events">
      <PageGrid type="small">
        {loading ? placeholderSkeletons : renderEvents(events)}
      </PageGrid>
    </PageSection>
  );
};

export default OrganizationEvents;
