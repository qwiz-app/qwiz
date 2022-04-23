import { Prisma, User } from '@prisma/client';
import { parseData } from 'lib/axios';
import http from 'services/http';

export const fetchUsers = () => http.get<User[]>('/api/users').then(parseData);

export const fetchUser = (id: string) =>
  http.get<User>(`/api/users/${id}`).then(parseData);

export const fetchCurrentUser = () =>
  http.get<User>(`/api/users/me`).then(parseData);

export const updateUser = (id: string, data: Prisma.UserUpdateInput) =>
  http.patch<User>(`/api/users/${id}`, data).then(parseData);

export const deleteUser = (id: string) =>
  http.delete<User>(`/api/users/${id}`).then(parseData);
