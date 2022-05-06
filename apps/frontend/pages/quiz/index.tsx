import { QuizCard } from 'components/Cards/quiz/QuizCard';
import { QuizCardSmall } from 'components/Cards/quiz/QuizCardSmall';
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

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const [showCreateQuizModal, setShowCreateQuizModal] = useState(false);

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

  return (
    <HomepageLayout>
      <PageSection
        title="Create quiz"
        description="Turn any Qwiz template into a new quiz"
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
