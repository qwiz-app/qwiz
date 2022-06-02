import { Container } from '@mantine/core';
import { DashboardHero } from 'components/Dashboard/DashboardHero';
import { OrganizationDashboard } from 'components/Dashboard/OrganizationDashboard';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import { HomepageLayout } from 'components/PageLayouts/HomepageLayout';
import { PageSection } from 'components/PageLayouts/PageSection';
import { useCurrentUser } from 'hooks/api/users';

const IndexPage = () => {
  const { isOrganization } = useCurrentUser();

  return (
    <Container size="xl" px={0}>
      <HomepageLayout>
        <PageSection title="Dashboard">
          <DashboardHero />
        </PageSection>
        {isOrganization && <OrganizationDashboard />}
      </HomepageLayout>
    </Container>
  );
};

export default IndexPage;

IndexPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
