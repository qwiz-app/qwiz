import { SegmentedControl, Stack } from '@mantine/core';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import { HomepageLayout } from 'components/PageLayouts/HomepageLayout';
import { PageSection } from 'components/PageLayouts/PageSection';
import { QuestionsTable } from 'components/Questions/QuestionsTable';
import { useAvailableQuestions, useMyQuestions } from 'hooks/api/question';
import { useState } from 'react';

const QuestionsPage = (props) => {
  const { data: myQuestions } = useMyQuestions();
  const { data: availableQuestions } = useAvailableQuestions();

  const questionTabs = [
    { label: 'Personal', value: 'personal' },
    { label: 'All available', value: 'available' },
  ];

  const [shownQuestions, setShownQuestions] = useState<
    'available' | 'personal' | string
  >('personal');

  return (
    <HomepageLayout>
      <PageSection title="Your questions" description="Made for you, by you">
        <Stack align="start">
          <SegmentedControl
            value={shownQuestions}
            onChange={setShownQuestions}
            data={questionTabs}
          />
          <QuestionsTable
            questions={
              shownQuestions === 'available' ? availableQuestions : myQuestions
            }
          />
        </Stack>
      </PageSection>
    </HomepageLayout>
  );
};

export default QuestionsPage;

QuestionsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
