import { parseData } from 'lib/axios';
import http from 'services/http';
import { TeamCreateWithMembers, TeamFull, TeamUpdate } from 'types/api/teams';

export const fetchTeams = () =>
  http.get<TeamFull[]>(`/api/teams`).then(parseData);

export const fetchTeam = (id: string) =>
  http.get<TeamFull>(`/api/teams/${id}`).then(parseData);

export const createTeam = (data: TeamCreateWithMembers) =>
  http.post<TeamFull>(`/api/teams`, data).then(parseData);

export const updateTeam = (id: string, data: TeamUpdate) =>
  http.patch<{ count: number }>(`/api/teams/${id}`, data).then(parseData);

export const deleteTeam = (id: string) =>
  http.delete<{ count: number }>(`/api/teams/${id}`).then(parseData);
