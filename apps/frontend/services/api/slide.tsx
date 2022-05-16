import { Prisma } from '@prisma/client';
import { parseData } from 'lib/axios';
import http from 'services/http';
import { SlideWithQuestionAndElements } from 'types/slide';

export const fetchSlide = (id: string) =>
  http.get<SlideWithQuestionAndElements>(`/api/slide/${id}`).then(parseData);

export const updatePoint = (id: string, data: Prisma.PointUpdateInput) =>
  http.patch<{ count: number }>(`/api/slide/point/${id}`, data).then(parseData);

export const updateContent = (
  id: string,
  data: Prisma.QuestionContentUpdateInput
) =>
  http
    .patch<{ count: number }>(`/api/slide/question-content/${id}`, data)
    .then(parseData);
