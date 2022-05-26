import { paths } from 'paths';
import { useState, useEffect } from 'react';
import { QuizWithSlides } from 'types/api/quiz';

export const useQuizSlideRoute = (quiz: QuizWithSlides) => {
  const url = quiz?.slides.length
    ? paths.quizEditSlide(quiz.id, quiz.slides[0].id)
    : paths.quizEdit(quiz.id);

  const [fullUrl, setFullUrl] = useState(`https://app.qwiz.party/${url}`);

  useEffect(() => {
    setFullUrl(`${window?.location.href}/${url}`);
  }, []);

  return {
    url,
    fullUrl,
  };
};
