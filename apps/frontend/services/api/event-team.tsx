import { EventTeam, Prisma } from '@prisma/client';
import { parseData } from 'lib/axios';
import http from 'services/http';

export const createEventTeam = (data: Prisma.EventTeamUncheckedCreateInput) =>
  http.post<EventTeam>('/api/event-team', data).then(parseData);

export const deleteEventTeam = (id: string) =>
  http.delete<EventTeam>(`/api/event-team/${id}`).then(parseData);
