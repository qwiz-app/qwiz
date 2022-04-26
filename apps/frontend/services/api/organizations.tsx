import { Organization, Prisma } from '@prisma/client';
import { parseData } from 'lib/axios';
import http from 'services/http';

export const fetchOrganizations = () =>
  http
    .get<(Organization & Prisma.OrganizationInclude)[]>('/api/organizations')
    .then(parseData);

export const fetchCurrentOrganization = () =>
  http.get<Organization>(`/api/organizations/me`).then(parseData);

export const fetchOrganization = (id: string) =>
  http
    .get<Organization & Prisma.OrganizationInclude>(`/api/organizations/${id}`)
    .then(parseData);

export const createOrganization = (data: Prisma.OrganizationCreateInput) =>
  http.post<Organization>(`/api/organizations`, data).then(parseData);

export const updateCurrentOrganization = (
  data: Prisma.OrganizationUpdateInput
) => http.patch<Organization>(`/api/organizations/me`, data).then(parseData);

export const deleteCurrentOrganization = () =>
  http.delete<Organization>(`/api/organizations/me`).then(parseData);

//* ADMIN-ONLY
export const deleteOrganization = (id: string) =>
  http.delete<Organization>(`/api/organizations/${id}`).then(parseData);
