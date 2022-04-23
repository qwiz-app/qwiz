import DashboardLayout from 'components/Layouts/DashboardLayout';
import { useCurrentUserInfo } from 'hooks/api/users';
import { useEffect } from 'react';

const ProfilePage = () => {
  const { data: me, isLoading } = useCurrentUserInfo();

  useEffect(() => {
    if (me) {
      console.log('me', me);
    }
  }, []);
  return (
    <div>
      <h1>My info</h1>
      {isLoading && <p>Loading...</p>}
      {me && (
        <div>
          <h2>{me.name}</h2>
          <p>{me.email}</p>
        </div>
      )}
      <div />
    </div>
  );
};

export default ProfilePage;

ProfilePage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
