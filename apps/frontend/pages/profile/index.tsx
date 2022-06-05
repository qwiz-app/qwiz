import DashboardLayout from 'components/Layouts/DashboardLayout';
import { HomepageLayout } from 'components/PageLayouts/HomepageLayout';
import { PageSection } from 'components/PageLayouts/PageSection';
import UserProfileCard from 'components/UI/UserProfileCard';
import { useCurrentUser } from 'hooks/api/users';

const ProfilePage = () => {
  const { user, isLoading } = useCurrentUser();

  return (
    <HomepageLayout>
      <PageSection title="My profile">
        {user && !isLoading && <UserProfileCard user={user} />}
      </PageSection>
    </HomepageLayout>
  );
};

export default ProfilePage;

ProfilePage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
