import { Question, Prisma } from '@prisma/client';
import { parseData } from 'lib/axios';
import http from 'services/http';

export const fetchAvailableQuestions = () =>
  http
    .get<(Question & Prisma.QuestionInclude)[]>('/api/questions')
    .then(parseData);

export const fetchQuestion = (id: string) =>
  http
    .get<Question & Prisma.QuestionInclude>(`/api/questions/${id}`)
    .then(parseData);

export const createQuestion = (data: Prisma.QuestionCreateInput) =>
  http.post<Question>(`/api/questions`, data).then(parseData);

export const updateQuestion = (id: string, data: Prisma.QuestionUpdateInput) =>
  http.patch<{ count: number }>(`/api/questions/${id}`, data).then(parseData);

export const deleteQuestion = (id: string) =>
  http.delete<{ count: number }>(`/api/questions/${id}`).then(parseData);

export const fetchAnyQuestion = (id: string) =>
  http
    .get<Question & Prisma.QuestionInclude>(`/api/questions/${id}/any`)
    .then(parseData);

export const updateAnyQuestion = (
  id: string,
  data: Prisma.QuestionUpdateInput
) => http.patch<Question>(`/api/questions/${id}/any`, data).then(parseData);

export const deleteAnyQuestion = (id: string) =>
  http.delete<Question>(`/api/questions/${id}/any`).then(parseData);

//* ADMIN-ONLY
export const fetchAllQuestions = () =>
  http
    .get<(Question & Prisma.QuestionInclude)[]>('/api/questions/all')
    .then(parseData);
