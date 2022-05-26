import DashboardLayout from 'components/Layouts/DashboardLayout';
import { HomepageLayout } from 'components/PageLayouts/HomepageLayout';
import { PageSection } from 'components/PageLayouts/PageSection';
import { QuestionsTable } from 'components/Questions/QuestionsTable';
import { useMyQuestions } from 'hooks/api/question';

const QuestionsPage = (props) => {
  const { data: questions } = useMyQuestions();

  return (
    <HomepageLayout>
      <PageSection title="Your questions" description="Made for you, by you">
        <QuestionsTable questions={questions} />
      </PageSection>
    </HomepageLayout>
  );
};

export default QuestionsPage;

QuestionsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
