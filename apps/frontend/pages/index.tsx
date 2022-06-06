import { Container } from '@mantine/core';
import DashboardEvents from 'components/Dashboard/DashboardEvents';
import { DashboardHero } from 'components/Dashboard/DashboardHero';
import { OrganizationDashboard } from 'components/Dashboard/OrganizationDashboard';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import { HomepageLayout } from 'components/PageLayouts/HomepageLayout';
import { PageSection } from 'components/PageLayouts/PageSection';
import { useCurrentUser } from 'hooks/api/users';

const IndexPage = () => {
  const { isOrganization, isLoading, isSessionLoading } = useCurrentUser();

  return (
    <Container size="xl" px={0}>
      <HomepageLayout>
        <PageSection title="Your dashboard">
          <DashboardHero />
        </PageSection>
        {isOrganization && <OrganizationDashboard />}
        {!isOrganization && !isLoading && !isSessionLoading && (
          <DashboardEvents />
        )}
      </HomepageLayout>
    </Container>
  );
};

export default IndexPage;

IndexPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
