import { useSlide } from 'hooks/api/slide';
import { useRouter } from 'next/router';

export const useCurrentSlide = () => {
  const router = useRouter();
  const { slideId, quizId } = router.query;

  const { data: slide, isLoading } = useSlide(
    slideId as string,
    quizId as string
  );

  const answers = slide?.quizQuestion?.question?.answers ?? [];
  const question = slide?.quizQuestion?.question;

  const hasQuestion = !!slide?.quizQuestion?.id && !isLoading;

  return {
    slide,
    isLoading,
    id: slideId as string,
    quizId: quizId as string,
    hasQuestion,
    answers,
    question,
  };
};
