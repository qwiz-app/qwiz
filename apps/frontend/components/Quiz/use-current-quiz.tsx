import { useQuiz } from 'hooks/api/quiz';
import { useRouter } from 'next/router';

export const useCurrentQuiz = () => {
  const router = useRouter();
  const { quizId } = router.query;

  const { data: quiz, isLoading } = useQuiz(quizId as string);

  return { quiz, isLoading, id: quizId as string };
};
