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
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const [showCreateQuizModal, setShowCreateQuizModal] = useState(false);

  const templates = [
    {
      href: '/',
      label: 'Audio',
      image:
        'https://www.commonsense.org/education/sites/default/files/styles/16_9_medium/public/blog-share/2020-bts-homepageimages-green.jpg?itok=Q8W9c7h9',
    },
    {
      href: '/',
      label: 'Multiple choice',
      image:
        'https://powerpointschool.com/wp-content/uploads/2018/04/Free-Creative-PowerPoint-Template.png',
    },
    {
      href: '/',
      label: 'Visual',
      image:
        'https://assets-global.website-files.com/5e4319072e6fb910d3a508a6/6196aad5a073b5d0287c61f1_EOY%20Templates%20-%20Blog%20Design.jpg',
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
