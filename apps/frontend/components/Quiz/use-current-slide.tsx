import { useSlide } from 'hooks/api/slide';
import { useRouter } from 'next/router';

export const useCurrentSlide = () => {
  const router = useRouter();
  const { slideId, quizId } = router.query;

  const { data: slide, isLoading } = useSlide(
    slideId as string,
    quizId as string
  );

  return { slide, isLoading, id: slideId as string, quizId: quizId as string };
};
