import { EventsAny } from 'components/Event/EventPage/EventsAny';
import { EventsCurrentOrganization } from 'components/Event/EventPage/EventsCurrentOrganization';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import { HomepageLayout } from 'components/PageLayouts/HomepageLayout';
import { useCurrentUser } from 'hooks/api/users';

const EventsPage = () => {
  const { isOrganization } = useCurrentUser();

  return (
    <HomepageLayout>
      {isOrganization ? <EventsCurrentOrganization /> : <EventsAny />}
    </HomepageLayout>
  );
};

export default EventsPage;

EventsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
