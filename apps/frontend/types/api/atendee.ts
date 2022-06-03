import { Attendee, User } from '@prisma/client';

export type AttendeeWithUser = Attendee & {
  user?: User;
};
