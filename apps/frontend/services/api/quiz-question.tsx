import { Prisma, QuizQuestion } from '@prisma/client';
import { parseData } from 'lib/axios';
import http from 'services/http';

export const createQuizQuestion = (
  data: Prisma.QuizQuestionUncheckedCreateInput
) => http.post<QuizQuestion>(`/api/quiz-questions`, data).then(parseData);

export const updateQuizQuestion = (
  id: string,
  data: Prisma.QuizQuestionUncheckedUpdateInput
) =>
  http.patch<QuizQuestion>(`/api/quiz-questions/${id}`, data).then(parseData);
