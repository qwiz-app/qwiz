import QuizLayout from 'components/Layouts/QuizLayout';
import { useQuiz } from 'hooks/api/quiz';
import { useRouter } from 'next/router';

const QuizPage = () => {
  const router = useRouter();

  const { data: quiz } = useQuiz(router.query.id as string);

  return (
    <div>
      <h1>{quiz?.name}</h1>
      <p>{quiz?.description}</p>
    </div>
  );
};

export default QuizPage;

QuizPage.getLayout = function getLayout(page) {
  return <QuizLayout>{page}</QuizLayout>;
};
