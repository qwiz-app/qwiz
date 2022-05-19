import { Organization, Prisma } from '@prisma/client';
import { parseData } from 'lib/axios';
import http from 'services/http';
import { OrganizationWithUser } from 'types/organization';

export const fetchOrganizations = () =>
  http.get<OrganizationWithUser[]>('/api/organizations').then(parseData);

export const fetchCurrentOrganization = () =>
  http.get<Organization>(`/api/organizations/me`).then(parseData);

export const fetchOrganization = (id: string) =>
  http.get<OrganizationWithUser>(`/api/organizations/${id}`).then(parseData);

export const createOrganization = (data: Prisma.OrganizationCreateInput) =>
  http.post<Organization>(`/api/organizations`, data).then(parseData);

export const updateOrganization = (data: Prisma.OrganizationUpdateInput) =>
  http.patch<Organization>(`/api/organizations/me`, data).then(parseData);

export const deleteOrganization = () =>
  http.delete<Organization>(`/api/organizations/me`).then(parseData);

//* ADMIN-ONLY
export const deleteAnyOrganization = (id: string) =>
  http.delete<Organization>(`/api/organizations/${id}`).then(parseData);
