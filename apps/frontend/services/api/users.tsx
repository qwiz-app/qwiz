import { Prisma, User } from '@prisma/client';
import { parseData } from 'lib/axios';
import http from 'services/http';
import { UserRoleReq } from 'types/api/role';

export const fetchUsers = () => http.get<User[]>('/api/users').then(parseData);

export const fetchUser = (id: string) =>
  http.get<User>(`/api/users/${id}`).then(parseData);

export const fetchCurrentUser = () =>
  http.get<User>(`/api/users/me`).then(parseData);

export const updateCurrentUser = (data: Prisma.UserUpdateInput) =>
  http.patch<User>(`/api/users/me`, data).then(parseData);

export const deleteCurrentUser = () =>
  http.delete<User>(`/api/users/me`).then(parseData);

export const assignRoleAndCreateAccount = (userRoleReq: UserRoleReq) =>
  http.post<User>(`/api/users/assign-role`, userRoleReq).then(parseData);

//* ADMIN-ONLY
export const updateUser = (id: string, data: Prisma.UserUpdateInput) =>
  http.patch<User>(`/api/users/${id}`, data).then(parseData);

//* ADMIN-ONLY
export const deleteUser = (id: string) =>
  http.delete<User>(`/api/users/${id}`).then(parseData);
