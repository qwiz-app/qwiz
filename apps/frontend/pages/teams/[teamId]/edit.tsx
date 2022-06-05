import DashboardLayout from 'components/Layouts/DashboardLayout';
import { teamSchema } from 'domain/util/validation';
import { Formik } from 'formik';
import React from 'react';
import { TeamForm } from 'components/Team/TeamForm';
import { useFileUpload } from 'hooks/use-flle-upload';
import { TeamFormValues } from 'types/forms/TeamFormValues';
import { useAttendees } from 'hooks/api/attendees';
import { Container } from '@mantine/core';
import { HomepageLayout } from 'components/PageLayouts/HomepageLayout';
import { useTeam, useTeamUpdate } from 'hooks/api/teams';
import { useRouter } from 'next/router';
import { paths } from 'paths';

const TeamEditPage = (props) => {
  const { attendees, initialValues, fileUpload, handleSubmit } =
    useTeamEditPage();

  return (
    <HomepageLayout>
      <Container size="sm" p={0}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={teamSchema}
        >
          <TeamForm
            attendees={attendees}
            fileUpload={fileUpload}
            action="edit"
          />
        </Formik>
      </Container>
    </HomepageLayout>
  );
};

const useTeamEditPage = () => {
  const router = useRouter();
  const teamId = router.query.teamId as string;
  const fileUpload = useFileUpload();

  const { data: team } = useTeam(teamId);
  const { data: attendees } = useAttendees();

  const initialValues = {
    name: team?.name ?? '',
    members: team?.members?.map((m) => m.id) ?? [],
    image: team?.image ?? fileUpload?.url,
  };

  const { mutateAsync: updateTeam } = useTeamUpdate(teamId);

  const handleSubmit = async (values: TeamFormValues) => {
    await updateTeam(
      { ...values, image: fileUpload?.url },
      { onSuccess: () => router.push(paths.teams()) }
    );
  };

  return { attendees, initialValues, fileUpload, handleSubmit };
};

export default TeamEditPage;

TeamEditPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
