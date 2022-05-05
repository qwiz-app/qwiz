import { Quiz, Prisma } from '@prisma/client';
import { parseData } from 'lib/axios';
import http from 'services/http';

export const fetchQuizzes = () =>
  http.get<(Quiz & Prisma.QuizInclude)[]>('/api/quiz').then(parseData);

export const fetchQuiz = (id: string) =>
  http.get<Quiz & Prisma.QuizInclude>(`/api/quiz/${id}`).then(parseData);

export const createQuiz = (data: Prisma.QuizUncheckedCreateInput) =>
  http.post<Quiz>(`/api/quiz`, data).then(parseData);

export const updateQuiz = (id: string, data: Prisma.QuizUpdateInput) =>
  http.patch<{ count: number }>(`/api/quiz/${id}`, data).then(parseData);

export const deleteQuiz = (id: string) =>
  http.delete<{ count: number }>(`/api/quiz/${id}`).then(parseData);
