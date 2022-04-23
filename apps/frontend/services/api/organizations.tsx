import { Organization, Prisma } from '@prisma/client';
import { parseData } from 'lib/axios';
import http from 'services/http';

export const fetchOrganizations = () =>
  http.get<Organization[]>('/api/organizations').then(parseData);

export const fetchOrganization = (id: string) =>
  http.get<Organization>(`/api/organizations/${id}`).then(parseData);

export const fetchCurrentOrganization = () =>
  http.get<Organization>(`/api/organizations/me`).then(parseData);

export const createOrganization = (data: Prisma.OrganizationCreateInput) =>
  http.post<Organization>(`/api/organizations`, data).then(parseData);

export const updateOrganization = (
  id: string,
  data: Prisma.OrganizationUpdateInput
) => http.patch<Organization>(`/api/organizations/${id}`, data).then(parseData);

export const deleteOrganization = (id: string) =>
  http.delete<Organization>(`/api/organizations/${id}`).then(parseData);
