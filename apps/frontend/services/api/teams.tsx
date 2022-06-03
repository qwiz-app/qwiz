import { parseData } from 'lib/axios';
import http from 'services/http';
import { TeamCreateWithMembers, TeamFull } from 'types/api/teams';

export const fetchTeams = () =>
  http.get<TeamFull[]>(`api/teams`).then(parseData);

export const fetchTeam = (id: string) =>
  http.get<TeamFull>(`api/teams/${id}`).then(parseData);

export const createTeam = (data: TeamCreateWithMembers) =>
  http.post<TeamFull>(`api/teams`, data).then(parseData);

export const deleteTeam = (id: string) =>
  http.delete<{ count: number }>(`api/teams/${id}`).then(parseData);
