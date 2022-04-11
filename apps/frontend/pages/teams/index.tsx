import DashboardLayout from 'components/layout/DashboardLayout';
import { useCurrentUserInfo } from 'hooks/users/users';
import { useEffect } from 'react';

const TeamsPage = () => {
  const { data: me, isFetching } = useCurrentUserInfo();

  useEffect(() => {
    if (me) {
      console.log('me', me);
    }
  }, []);
  return (
    <div>
      <h1>My info</h1>
      {isFetching ? (
        <p>Fetching...</p>
      ) : (
        <div>
          <h2>{me.name}</h2>
          <p>{me.email}</p>
        </div>
      )}
      <div />
    </div>
  );
};

export default TeamsPage;

TeamsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
