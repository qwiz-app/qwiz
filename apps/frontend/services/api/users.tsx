import { User } from '@prisma/client';
import { parseData } from 'lib/axios';
import http from 'services/http';

export const fetchUsers = () => http.get<User[]>('/api/users').then(parseData);

export const fetchUser = (id: string) =>
  http.get<User>(`/api/users/${id}`).then(parseData);

export const fetchCurrentUser = () =>
  http.get<User>(`/api/users/me`).then(parseData);
