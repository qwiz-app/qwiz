import { EventsAny } from 'components/Event/EventPage/EventsAny';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import { HomepageLayout } from 'components/PageLayouts/HomepageLayout';

const ExplorePage = (props) => {
  return (
    <HomepageLayout>
      <EventsAny />
    </HomepageLayout>
  );
};

export default ExplorePage;

ExplorePage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
