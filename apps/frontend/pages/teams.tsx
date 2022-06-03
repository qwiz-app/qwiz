import DashboardLayout from 'components/Layouts/DashboardLayout';
import { useTeams } from 'hooks/api/teams';

const TeamsPage = (props) => {
  const { data: teams } = useTeams();

  return (
    <div>
      <h1>Teams page</h1>
      {teams && teams?.map((team) => <div key={team.id}>{team.name}</div>)}
    </div>
  );
};

export default TeamsPage;

TeamsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
