import DashboardLayout from 'components/Layouts/DashboardLayout';
import { HomepageLayout } from 'components/PageLayouts/HomepageLayout';
import { useQuiz } from 'hooks/api/quiz';
import { useRouter } from 'next/router';

const QuizPage = () => {
  const router = useRouter();

  const { data: quiz } = useQuiz(router.query.id as string);

  return (
    <HomepageLayout>
      <h1>{quiz?.name}</h1>
      <p>{quiz?.description}</p>
    </HomepageLayout>
  );
};

export default QuizPage;

QuizPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
