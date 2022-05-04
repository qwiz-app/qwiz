import { Prisma, Role, User } from '@prisma/client';
import { parseData } from 'lib/axios';
import http from 'services/http';

export const fetchUsers = () => http.get<User[]>('/api/users').then(parseData);

export const fetchUser = (id: string) =>
  http.get<User & Prisma.UserInclude>(`/api/users/${id}`).then(parseData);

export const fetchCurrentUser = () =>
  http.get<User & Prisma.UserInclude>(`/api/users/me`).then(parseData);

export const updateCurrentUser = (data: Prisma.UserUpdateInput) =>
  http.patch<User>(`/api/users/me`, data).then(parseData);

export const deleteCurrentUser = () =>
  http.delete<User>(`/api/users/me`).then(parseData);

export const assignRoleAndCreateAccount = (
  role: Role,
  data: Prisma.OrganizationCreateInput | Prisma.AttendeeCreateInput
) => http.post<User>(`/api/users/assign-role`, { role, data }).then(parseData);

//* ADMIN-ONLY
export const updateUser = (id: string, data: Prisma.UserUpdateInput) =>
  http.patch<User>(`/api/users/${id}`, data).then(parseData);

//* ADMIN-ONLY
export const deleteUser = (id: string) =>
  http.delete<User>(`/api/users/${id}`).then(parseData);
