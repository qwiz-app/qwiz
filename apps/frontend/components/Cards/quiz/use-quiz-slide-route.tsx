import { paths } from 'paths';
import { QuizWithSlides } from 'types/api/quiz';

export const useQuizSlideRoute = (quiz: QuizWithSlides) => {
  const url = quiz?.slides.length
    ? paths.quizEditSlide(quiz.id, quiz.slides[0].id)
    : paths.quizEdit(quiz.id);

  const fullUrl = `${window.location.href}/${url}`;

  return {
    url,
    fullUrl,
  };
};
