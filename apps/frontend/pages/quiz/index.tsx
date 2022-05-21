import { NoQuizzesAlert } from 'components/Cards/quiz/NoQuizzesAlert';
import { QuizCard } from 'components/Cards/quiz/QuizCard';
import { QuizCardSmall } from 'components/Cards/quiz/QuizCardSmall';
import { FramerAnimatedListItem } from 'components/Framer/FramerAnimatedListItem';
import PageGrid from 'components/Grids/PageGrid';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import { HomepageLayout } from 'components/PageLayouts/HomepageLayout';
import { PageSection } from 'components/PageLayouts/PageSection';
import { useQuizCreate, useQuizzes } from 'hooks/api/quiz';
import { useRouter } from 'next/router';
import { paths } from 'paths';

const QuizPage = () => {
  const router = useRouter();

  const { data: quizzes, isLoading, isPlaceholderData } = useQuizzes();
  const { mutate:createQuiz, isLoading: isCreateLoading } = useQuizCreate();

  const hasQuizzes = quizzes?.length > 0;

  const handleCreateQuiz = () => {
    createQuiz(
      {},
      {
        // TODO: create new slide by default
        onSuccess: (quiz) => router.push(paths.quizEdit(quiz.id)),
      }
    );
  };

  return (
    <HomepageLayout>
      <PageSection
        title="Create quiz"
        description="Turn any Qwiz temsplate into a new quiz"
      >
        <PageGrid type="tiniest">
          <QuizCardSmall.New onClick={handleCreateQuiz} loading={isCreateLoading}/>
          {templates.map((template, idx) => (
            <QuizCardSmall.Template key={idx} {...template} />
          ))}
        </PageGrid>
      </PageSection>

      <PageSection title="Recently edited">
        <PageGrid type="tiny">
          {quizzes?.map((quiz) => (
            <FramerAnimatedListItem id={quiz.id} key={quiz.id}>
              <QuizCard quiz={quiz} loading={isLoading || isPlaceholderData} />
            </FramerAnimatedListItem>
          ))}
        </PageGrid>
        {!hasQuizzes && <NoQuizzesAlert />}
      </PageSection>
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
