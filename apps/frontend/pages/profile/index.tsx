import DashboardLayout from 'components/Layouts/DashboardLayout';
import { useCurrentUser } from 'hooks/api/users';
import { useEffect } from 'react';

const ProfilePage = () => {
  const { user, isLoading } = useCurrentUser();

  useEffect(() => {
    if (user) {
      console.log('user', user);
    }
  }, []);
  return (
    <div>
      <h1>My info</h1>
      {isLoading && <p>Loading...</p>}
      {user && (
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
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
