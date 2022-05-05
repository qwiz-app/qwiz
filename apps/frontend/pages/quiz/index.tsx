import { CreateNew } from 'components/Cards/CreateNew';
import { QuizCard } from 'components/Cards/QuizCard';
import PageGrid from 'components/Grids/PageGrid';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import { CreateQuizModal } from 'components/Modals/Quiz/CreateQuizModal';
import { HomepageLayout } from 'components/PageLayouts/HomepageLayout';
import { PageSection } from 'components/PageLayouts/PageSection';
import { useQuizzes } from 'hooks/api/quiz';
import { useCurrentUserInfo } from 'hooks/api/users';
import { useEffect, useState } from 'react';

const QuizPage = () => {
  const { data: author } = useCurrentUserInfo();

  const [loading, setLoading] = useState(true);

  const [showCreateQuizModal, setShowCreateQuizModal] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const { data: quizzes } = useQuizzes();

  return (
    <HomepageLayout>
      <PageSection title="Recently edited">
        <PageGrid type="tiny">
          <CreateNew onClick={() => setShowCreateQuizModal(true)} />
          {quizzes?.map((quiz, i) => (
            <QuizCard
              key={i}
              link={`/quiz/${quiz.id}`}
              title={quiz.name}
              author={author}
              published
              image={quiz?.thumbnail}
              loading={loading}
            />
          ))}
        </PageGrid>
      </PageSection>
      <CreateQuizModal
        opened={showCreateQuizModal}
        onClose={() => setShowCreateQuizModal(false)}
      />
    </HomepageLayout>
  );
};

export default QuizPage;

QuizPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
