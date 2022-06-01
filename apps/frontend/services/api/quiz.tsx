import { Prisma } from '@prisma/client';
import { parseData } from 'lib/axios';
import http from 'services/http';
import { QuizWithOwner, QuizWithSlides } from 'types/api/quiz';

export const fetchQuizzes = () =>
  http.get<QuizWithSlides[]>('/api/quiz/owner/me').then(parseData);

export const fetchQuiz = (id: string) =>
  http.get<QuizWithSlides>(`/api/quiz/${id}`).then(parseData);

export const createQuiz = (data: Prisma.QuizCreateWithoutOwnerInput) =>
  http.post<QuizWithSlides>(`/api/quiz`, data).then(parseData);

export const updateQuiz = (id: string, data: Prisma.QuizUpdateInput) =>
  http.patch<{ count: number }>(`/api/quiz/${id}`, data).then(parseData);

export const deleteQuiz = (id: string) =>
  http.delete<{ count: number }>(`/api/quiz/${id}`).then(parseData);

//* ADMIN-ONLY
export const fetchAnyQuizzes = () =>
  http.get<QuizWithOwner[]>('/api/quiz/all').then(parseData);

//* ADMIN-ONLY
export const fetchQuizzesByOwner = (ownerId: string) =>
  http.get<QuizWithOwner[]>(`/api/quiz/owner/${ownerId}`).then(parseData);

//* ADMIN-ONLY
export const deleteAnyQuiz = (id: string) =>
  http.delete<{ count: number }>(`/api/quiz/${id}/any`).then(parseData);
