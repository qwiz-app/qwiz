import { Event, EventTeam, Prisma, Team } from '@prisma/client';
import { AttendeeWithUser } from 'types/api/atendee';

export type EventTeamWitTeam = EventTeam & {
  team: Team;
};

export type EventTeamWithEvent = EventTeam & {
  event: Event;
};

export type TeamFull = Team & {
  admin: AttendeeWithUser;
  members: AttendeeWithUser[];
  eventTeams?: EventTeamWithEvent[];
  _count?: Prisma.TeamCountOutputType;
};

export type TeamCreateWithMembers = Prisma.TeamCreateInput & {
  members?: Prisma.AttendeeWhereUniqueInput[];
};
