import { Loader, Tabs } from '@mantine/core';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import { HomepageLayout } from 'components/PageLayouts/HomepageLayout';
import { PageSection } from 'components/PageLayouts/PageSection';
import { QuestionsTable } from 'components/Questions/QuestionsTable';
import {
  useAllQuestions,
  useAvailableQuestions,
  useMyQuestions
} from 'hooks/api/question';
import { useCurrentUser } from 'hooks/api/users';
import { useAppColorscheme } from 'hooks/colorscheme';
import { Globe, UserCircle } from 'phosphor-react';

const QuestionsPage = () => {
  const { isAdmin, isOrganization, isSessionLoading } = useCurrentUser();
  const { data: myQuestions, isLoading: isMyQuestionsLoading } = useMyQuestions(
    !isAdmin
  );
  const { data: availableQuestions, isLoading: isQuestionsLoading } =
    useAvailableQuestions(!isAdmin);
  const { data: allQuestions, isLoading: isAllQuestionsLoading } =
    useAllQuestions(isAdmin);
  const { isDark } = useAppColorscheme();

  return (
    <HomepageLayout>
      <PageSection
        title="Quiz questions"
        description="Look through all available questions"
      >
        {isSessionLoading && <Loader />}
        {isOrganization && (
          <Tabs sx={() => ({ width: '100%' })} color={isDark && 'orange'}>
            <Tabs.Tab
              icon={<UserCircle size={20} weight="duotone" />}
              label="Personal"
            >
              <QuestionsTable
                questions={myQuestions ?? []}
                loading={isMyQuestionsLoading}
              />
            </Tabs.Tab>
            <Tabs.Tab
              icon={<Globe size={20} weight="duotone" />}
              label="All available"
            >
              <QuestionsTable
                questions={availableQuestions ?? []}
                loading={isQuestionsLoading}
              />
            </Tabs.Tab>
          </Tabs>
        )}
        {isAdmin && (
          <Tabs sx={() => ({ width: '100%' })} color={isDark && 'orange'}>
            <Tabs.Tab
              icon={<Globe size={20} weight="duotone" />}
              label="All questions"
            >
              <QuestionsTable
                questions={allQuestions ?? []}
                loading={isAllQuestionsLoading}
              />
            </Tabs.Tab>
          </Tabs>
        )}
      </PageSection>
    </HomepageLayout>
  );
};

export default QuestionsPage;

QuestionsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
