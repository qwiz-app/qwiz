import { CreateNew } from 'components/Cards/quiz/CreateNew';
import { QuizCard } from 'components/Cards/quiz/QuizCard';
import PageGrid from 'components/Grids/PageGrid';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import { CreateQuizModal } from 'components/Modals/Quiz/CreateQuizModal';
import { HomepageLayout } from 'components/PageLayouts/HomepageLayout';
import { PageSection } from 'components/PageLayouts/PageSection';
import { useCurrentUserInfo } from 'hooks/api/users';
import { useEffect, useState } from 'react';

const QuizPage = () => {
  const { data: author } = useCurrentUserInfo();

  const quizzes = [
    {
      image: 'https://i.imgur.com/wMYcSSH.png',
      title: 'Best quiz in town',
      author,
      link: '/',
      published: false,
    },
    {
      image: 'https://i.imgur.com/wMYcSSH.png',
      title: 'Best quiz in town',
      author,
      link: '/',
      published: true,
    },
    {
      image: 'https://i.imgur.com/wMYcSSH.png',
      title: 'Best quiz in town',
      author,
      link: '/',
      published: false,
    },
    {
      image: 'https://i.imgur.com/wMYcSSH.png',
      category: 'Food',
      title: 'Best quiz in town',
      author,
      link: '/',
      published: true,
    },
    {
      image: 'https://i.imgur.com/wMYcSSH.png',
      title: 'Best quiz in town',
      author,
      link: '/',
      published: true,
    },
    {
      image: 'https://i.imgur.com/wMYcSSH.png',
      title: 'Best quiz in town',
      author,

      link: '/',
      published: true,
    },
  ];

  const [loading, setLoading] = useState(true);

  const [showCreateQuizModal, setShowCreateQuizModal] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <HomepageLayout>
      <PageSection
        title="Create quiz"
        description="Turn any Qwiz template into a new quiz"
      >
        <PageGrid type="tiniest">
          <CreateNew onClick={() => setShowCreateQuizModal(true)} />
          <CreateNew onClick={() => setShowCreateQuizModal(true)} />
          <CreateNew onClick={() => setShowCreateQuizModal(true)} />
          <CreateNew onClick={() => setShowCreateQuizModal(true)} />
        </PageGrid>
      </PageSection>
      <PageSection title="Recently edited">
        <PageGrid type="tiny">
          {quizzes.map((e, i) => (
            <QuizCard key={i} {...e} loading={loading} />
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
