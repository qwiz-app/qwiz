import { Prisma } from '@prisma/client';
import { parseData } from 'lib/axios';
import http from 'services/http';
import {
  QuestionCreateWithContentInput,
  QuestionWithContentAndCategoriesAndMode,
} from 'types/api/question';

export const fetchAvailableQuestions = () =>
  http
    .get<QuestionWithContentAndCategoriesAndMode[]>('/api/questions')
    .then(parseData);

export const fetchQuestionsByMe = () =>
  http
    .get<QuestionWithContentAndCategoriesAndMode[]>('/api/questions/me')
    .then(parseData);

export const fetchQuestion = (id: string) =>
  http
    .get<QuestionWithContentAndCategoriesAndMode>(`/api/questions/${id}`)
    .then(parseData);

export const createQuestion = (data: QuestionCreateWithContentInput) =>
  http
    .post<QuestionWithContentAndCategoriesAndMode>(`/api/questions`, data)
    .then(parseData);

export const updateQuestion = (id: string, data: Prisma.QuestionUpdateInput) =>
  http.patch<{ count: number }>(`/api/questions/${id}`, data).then(parseData);

export const deleteQuestion = (id: string) =>
  http.delete<{ count: number }>(`/api/questions/${id}`).then(parseData);

export const fetchAnyQuestion = (id: string) =>
  http
    .get<QuestionWithContentAndCategoriesAndMode>(`/api/questions/${id}/any`)
    .then(parseData);

//* ADMIN-ONLY
export const fetchAllQuestions = () =>
  http
    .get<QuestionWithContentAndCategoriesAndMode[]>('/api/questions/all')
    .then(parseData);

//* ADMIN-ONLY
export const updateAnyQuestion = (
  id: string,
  data: Prisma.QuestionUpdateInput
) =>
  http
    .patch<{ count: number }>(`/api/questions/${id}/any`, data)
    .then(parseData);

//* ADMIN-ONLY
export const deleteAnyQuestion = (id: string) =>
  http.delete<{ count: number }>(`/api/questions/${id}/any`).then(parseData);
