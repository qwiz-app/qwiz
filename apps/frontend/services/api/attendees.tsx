import { Attendee, Prisma } from '@prisma/client';
import { parseData } from 'lib/axios';
import http from 'services/http';

export const fetchAttendees = () =>
  http
    .get<(Attendee & Prisma.AttendeeInclude)[]>('/api/attendees')
    .then(parseData);

export const fetchAttendee = (id: string) =>
  http
    .get<Attendee & Prisma.AttendeeInclude>(`/api/attendees/${id}`)
    .then(parseData);

export const fetchCurrentAttendee = () =>
  http.get<Attendee>(`/api/attendees/me`).then(parseData);

export const createAttendee = (data: Prisma.AttendeeCreateInput) =>
  http.post<Attendee>(`/api/attendees`, data).then(parseData);

export const updateCurrentAttendee = (data: Prisma.AttendeeUpdateInput) =>
  http.patch<Attendee>(`/api/attendees/me`, data).then(parseData);

export const deleteCurrentAttendee = (id: string) =>
  http.delete<Attendee>(`/api/attendees/me`).then(parseData);

//* ADMIN-ONLY
export const deleteAttendee = (id: string) =>
  http.delete<Attendee>(`/api/attendees/${id}`).then(parseData);
