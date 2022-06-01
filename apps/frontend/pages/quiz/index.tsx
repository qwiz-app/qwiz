import PeepT1 from 'assets/peeps/templates/peep-template1.svg';
import PeepT2 from 'assets/peeps/templates/peep-template2.svg';
import PeepT3 from 'assets/peeps/templates/peep-template3.svg';
import { NoQuizzesAlert } from 'components/Cards/quiz/NoQuizzesAlert';
import { QuizCard } from 'components/Cards/quiz/QuizCard';
import { QuizCardSmall } from 'components/Cards/quiz/QuizCardSmall';
import { FramerAnimatedListItem } from 'components/Framer/FramerAnimatedListItem';
import PageGrid from 'components/Grids/PageGrid';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import { HomepageLayout } from 'components/PageLayouts/HomepageLayout';
import { PageSection } from 'components/PageLayouts/PageSection';
import { useQuizzes } from 'hooks/api/quiz';
import { useHandleCreateQuiz } from 'hooks/use-handle-create-quiz';

const QuizPage = () => {
  const { data: quizzes, isLoading, isPlaceholderData } = useQuizzes();
  const { createQuiz, isLoading: isCreateLoading } = useHandleCreateQuiz();

  const hasQuizzes = quizzes?.length > 0;

  return (
    <HomepageLayout>
      <PageSection
        title="Create quiz"
        description="Turn any Qwiz template into a new quiz"
      >
        <PageGrid type="tiniest">
          <QuizCardSmall.New onClick={createQuiz} loading={isCreateLoading} />
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
    image: PeepT1,
    color: '#f2bc94',
  },
  {
    href: '/',
    label: 'Visual',
    image: PeepT2,
    color: '#f5abf5',
  },
  {
    href: '/',
    label: 'Audio',
    image: PeepT3,
    color: '#abf5c4',
  },
];
