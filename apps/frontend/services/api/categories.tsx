import { Prisma, QuestionCategory } from '@prisma/client';
import { parseData } from 'lib/axios';
import http from 'services/http';

export const fetchCategories = () =>
  http.get<QuestionCategory[]>('/api/categories').then(parseData);

export const fetchCategory = (id: string) =>
  http.get<QuestionCategory>(`/api/categories/${id}`).then(parseData);

export const createCategory = (data: Prisma.QuestionCategoryCreateInput) =>
  http.post<QuestionCategory>(`/api/categories`, data).then(parseData);

export const updateCategory = (id: string) =>
  http.delete<QuestionCategory>(`/api/categories/${id}`).then(parseData);

export const deleteCategory = (id: string) =>
  http.delete<QuestionCategory>(`/api/categories/${id}`).then(parseData);
