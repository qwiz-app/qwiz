import { Prisma, Event } from '@prisma/client';
import { parseData } from 'lib/axios';
import http from 'services/http';
import { EventWithOrganization } from 'types/event';

export const fetchAllEvents = () =>
  http.get<EventWithOrganization[]>('/api/events').then(parseData);

export const fetchEvents = () =>
  http.get<EventWithOrganization[]>('/api/events/owner/me').then(parseData);

export const fetchEvent = (id: string) =>
  http.get<EventWithOrganization>(`/api/events/${id}`).then(parseData);

export const createEvent = (data: Prisma.EventCreateWithoutOwnerInput) =>
  http.post<Event>(`/api/events`, data).then(parseData);

export const updateEvent = (id: string, data: Prisma.EventUpdateInput) =>
  http.patch<{ count: number }>(`/api/events/${id}`, data).then(parseData);

export const deleteEvent = (id: string) =>
  http.delete<{ count: number }>(`/api/events/${id}`).then(parseData);

//* ADMIN-ONLY
export const deleteAnyEvent = (id: string) =>
  http.delete<{ count: number }>(`/api/events/${id}/any`).then(parseData);
