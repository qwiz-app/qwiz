import { QuizCard } from 'components/Cards/quiz/QuizCard';
import { QuizCardSmall } from 'components/Cards/quiz/QuizCardSmall';
import PageGrid from 'components/Grids/PageGrid';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import { CreateQuizModal } from 'components/Modals/Quiz/CreateQuizModal';
import { HomepageLayout } from 'components/PageLayouts/HomepageLayout';
import { PageSection } from 'components/PageLayouts/PageSection';
import { useQuizzes } from 'hooks/api/quiz';
import { useState } from 'react';

const QuizPage = () => {
  // TODO: maybe use session info if we are certain we only load our own quizzes
  // const { data: author } = useCurrentUserInfo();
  const { data: quizzes, isLoading, isPlaceholderData } = useQuizzes();

  const [showCreateQuizModal, setShowCreateQuizModal] = useState(false);

  return (
    <HomepageLayout>
      <PageSection
        title="Create quiz"
        description="Turn any Qwiz temsplate into a new quiz"
      >
        <PageGrid type="tiniest">
          <QuizCardSmall.New onClick={() => setShowCreateQuizModal(true)} />
          {templates.map((template, idx) => (
            <QuizCardSmall.Template key={idx} {...template} />
          ))}
        </PageGrid>
      </PageSection>
      <PageSection title="Recently edited">
        <PageGrid type="tiny">
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              image={quiz?.thumbnail}
              href={`/quiz/${quiz.id}`}
              title={quiz.name}
              published
              owner={quiz.owner}
              loading={isLoading || isPlaceholderData}
            />
          ))}
        </PageGrid>
      </PageSection>
      {/* placholders to test */}
      <PageSection title="Placeholders to test">
        <PageGrid type="tiny">
          {quizzes.map((quiz, i) => (
            <QuizCard
              key={i}
              image={quiz?.thumbnail}
              href={`/quiz/${quiz.id}`}
              title={quiz.name}
              published
              owner={quiz.owner}
              loading
            />
          ))}
          {/* placholders to test */}
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

const templates = [
  {
    href: '/',
    label: 'Multiple choice',
    image:
      'https://products.asiwallsolutions.com/img/patterns/PTN-M101-IMG1.jpg',
  },
  {
    href: '/',
    label: 'Visual',
    image:
      'https://www.zilliondesigns.com/blog/wp-content/uploads/Pattern-Logos.jpg',
  },
  {
    href: '/',
    label: 'Audio',
    image:
      'https://media.iapp.org/2020/11/23160339/dark_patterns_pawel-czerwinski-jJi1bjfBWYo-unsplash.jpg',
  },
];
