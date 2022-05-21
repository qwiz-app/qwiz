import { Prisma, Event } from '@prisma/client';
import { parseData } from 'lib/axios';
import http from 'services/http';
import { EventWithOwner } from 'types/api/event';

export const fetchAllEvents = () =>
  http.get<EventWithOwner[]>('/api/events').then(parseData);

export const fetchEventsByOrganization = (id: string) =>
  http.get<EventWithOwner[]>(`/api/events/owner/${id}`).then(parseData);

export const fetchEvents = () =>
  http.get<EventWithOwner[]>('/api/events/owner/me').then(parseData);

export const fetchEvent = (id: string) =>
  http.get<EventWithOwner>(`/api/events/${id}`).then(parseData);

export const createEvent = (
  data: Prisma.EventUncheckedCreateWithoutOwnerInput
) => http.post<Event>(`/api/events`, data).then(parseData);

export const updateEvent = (id: string, data: Prisma.EventUpdateInput) =>
  http.patch<{ count: number }>(`/api/events/${id}`, data).then(parseData);

export const deleteEvent = (id: string) =>
  http.delete<{ count: number }>(`/api/events/${id}`).then(parseData);

//* ADMIN-ONLY
export const deleteAnyEvent = (id: string) =>
  http.delete<{ count: number }>(`/api/events/${id}/any`).then(parseData);
