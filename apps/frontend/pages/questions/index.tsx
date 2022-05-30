import { Tabs } from '@mantine/core';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import { HomepageLayout } from 'components/PageLayouts/HomepageLayout';
import { PageSection } from 'components/PageLayouts/PageSection';
import { QuestionsTable } from 'components/Questions/QuestionsTable';
import { useAvailableQuestions, useMyQuestions } from 'hooks/api/question';
import { useAppColorscheme } from 'hooks/colorscheme';
import { Globe, UserCircle } from 'phosphor-react';

const QuestionsPage = (props) => {
  const { data: myQuestions, isLoading: isMyQuestionsLoading } =
    useMyQuestions();
  const { data: availableQuestions, isLoading: isQuestionsLoading } =
    useAvailableQuestions();
  const { isDark } = useAppColorscheme();

  return (
    <HomepageLayout>
      <PageSection
        title="Quiz questions"
        description="Look through all available questions"
      >
        <Tabs sx={() => ({ width: '100%' })} color={isDark && 'orange'}>
          <Tabs.Tab
            icon={<UserCircle size={20} weight="duotone" />}
            label="Personal"
          >
            <QuestionsTable
              questions={myQuestions}
              loading={isMyQuestionsLoading}
            />
          </Tabs.Tab>
          <Tabs.Tab
            icon={<Globe size={20} weight="duotone" />}
            label="All available"
          >
            <QuestionsTable
              questions={availableQuestions}
              loading={isQuestionsLoading}
            />
          </Tabs.Tab>
        </Tabs>
      </PageSection>
    </HomepageLayout>
  );
};

export default QuestionsPage;

QuestionsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
