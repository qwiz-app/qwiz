import { Prisma, QuizQuestion } from '@prisma/client';
import { parseData } from 'lib/axios';
import http from 'services/http';

export const createQuizQuestion = (data: Prisma.QuizQuestionCreateInput) =>
  http.post<QuizQuestion>(`/api/quiz-questions`, data).then(parseData);
