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
import { useTeamCreate } from 'hooks/api/teams';
import { useRouter } from 'next/router';
import { paths } from 'paths';

const TeamNewPage = (props) => {
  const { attendees, initialValues, fileUpload, handleSubmit } =
    useTeamNewPage();

  return (
    <HomepageLayout>
     <Container size="sm" p={0}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={teamSchema}
        >
          <TeamForm
            attendees={attendees}
            fileUpload={fileUpload}
            action="create"
          />
        </Formik>
      </Container>
    </HomepageLayout>
  );
};

const useTeamNewPage = () => {
  const { push } = useRouter();
  const fileUpload = useFileUpload();

  const initialValues = {
    name: '',
    members: [],
    image: fileUpload?.url ?? '',
  };

  const { data: attendees } = useAttendees();

  const { mutateAsync: createTeam } = useTeamCreate();

  const handleSubmit = async (values: TeamFormValues) => {
    await createTeam(
      { ...values, image: fileUpload?.url },
      { onSuccess: () => push(paths.teams()) }
    );
  };

  return { attendees, initialValues, fileUpload, handleSubmit };
};

export default TeamNewPage;

TeamNewPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
