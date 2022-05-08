import { Prisma, Quiz } from '@prisma/client';
import { parseData } from 'lib/axios';
import http from 'services/http';
import { QuizWithOrganization } from 'types/organization';

export const fetchQuizzes = () =>
  http.get<QuizWithOrganization[]>('/api/quiz/owner/me').then(parseData);

export const fetchQuiz = (id: string) =>
  http.get<QuizWithOrganization>(`/api/quiz/${id}`).then(parseData);

export const createQuiz = (data: Prisma.QuizCreateWithoutOwnerInput) =>
  http.post<Quiz>(`/api/quiz`, data).then(parseData);

export const updateQuiz = (id: string, data: Prisma.QuizUpdateInput) =>
  http.patch<{ count: number }>(`/api/quiz/${id}`, data).then(parseData);

export const deleteQuiz = (id: string) =>
  http.delete<{ count: number }>(`/api/quiz/${id}`).then(parseData);

//* ADMIN-ONLY
export const fetchAnyQuizzes = () =>
  http.get<QuizWithOrganization[]>('/api/quiz/all').then(parseData);

//* ADMIN-ONLY
export const fetchQuizzesByOwner = (ownerId: string) =>
  http
    .get<QuizWithOrganization[]>(`/api/quiz/owner/${ownerId}`)
    .then(parseData);

//* ADMIN-ONLY
export const deleteAnyQuiz = (id: string) =>
  http.delete<{ count: number }>(`/api/quiz/${id}/any`).then(parseData);
