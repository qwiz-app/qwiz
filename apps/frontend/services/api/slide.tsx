import { Prisma, QuizSlide } from '@prisma/client';
import { parseData } from 'lib/axios';
import http from 'services/http';
import { SlideWithQuestionAndElements } from 'types/slide';

export const fetchSlidesForQuiz = (id: string) =>
  http
    .get<SlideWithQuestionAndElements[]>(`/api/slide/quiz/${id}`)
    .then(parseData);

export const fetchSlide = (id: string) =>
  http.get<SlideWithQuestionAndElements>(`/api/slide/${id}`).then(parseData);

export const createSlide = (data: Prisma.QuizSlideUncheckedCreateInput) =>
  http.post<SlideWithQuestionAndElements>('/api/slide', data).then(parseData);

export const deleteSlide = (id: string) =>
  http.delete<QuizSlide>(`/api/slide/${id}`).then(parseData);

export const updatePoint = (id: string, data: Prisma.PointUpdateInput) =>
  http.patch<{ count: number }>(`/api/slide/point/${id}`, data).then(parseData);

export const updateContent = (
  id: string,
  data: Prisma.QuestionContentUpdateInput
) =>
  http
    .patch<{ count: number }>(`/api/slide/question-content/${id}`, data)
    .then(parseData);

export const createContent = (data: Prisma.QuestionContentCreateInput) =>
  http
    .post<{ count: number }>(`/api/slide/question-content`, data)
    .then(parseData);

export const deleteContent = (id: string) =>
  http.delete(`/api/slide/question-content/${id}`);
