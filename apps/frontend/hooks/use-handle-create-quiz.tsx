import { useRouter } from 'next/router';
import { paths } from 'paths';
import { useQuizCreate } from './api/quiz';

export const useHandleCreateQuiz = () => {
  const { mutate, isLoading } = useQuizCreate();
  const router = useRouter();

  const createQuiz = () =>
    mutate(
      {},
      {
        onSuccess: (quiz) => {
          const quizId = quiz.id;
          const slideId = quiz?.slides?.[0].id;
          const path = slideId
            ? paths.quizEditSlide(quizId, slideId)
            : paths.quizEdit(quizId);
          router.push(path);
        },
      }
    );

  return {
    createQuiz,
    isLoading,
  };
};
