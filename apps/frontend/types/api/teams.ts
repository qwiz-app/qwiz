import { EventTeam, Prisma, Team } from '@prisma/client';
import { AttendeeWithUser } from 'types/api/atendee';
import { EventWithOwner } from './event';

export type EventTeamWitTeam = EventTeam & {
  team: Team;
};

export type EventTeamWithEventAndItsOwner = EventTeam & {
  event: EventWithOwner;
};

export type TeamFull = Team & {
  admin: AttendeeWithUser;
  members: AttendeeWithUser[];
  eventTeams?: EventTeamWithEventAndItsOwner[];
  _count?: Prisma.TeamCountOutputType;
};

export type TeamCreateWithMembers = Prisma.TeamCreateInput & {
  members?: Prisma.AttendeeWhereUniqueInput[];
};
