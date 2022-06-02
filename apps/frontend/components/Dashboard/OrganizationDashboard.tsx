// import { createStyles } from '@mantine/core';
import { PageSection } from 'components/PageLayouts/PageSection';
import { DashboardAnalytics } from './DashboardAnalytics';
import { DashboardQwizStats } from './DashboardQwizStats';

export const OrganizationDashboard = (props) => {
  return (
    <>
      <PageSection>
        <DashboardAnalytics />
      </PageSection>
      <PageSection title="Your stats" description="Your Qwiz stats at a glance">
        <DashboardQwizStats />
      </PageSection>
    </>
  );
};
