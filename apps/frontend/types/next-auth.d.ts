import { DefaultSession } from 'next-auth';
import { Role } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: {
      role: Role | null;
    } & DefaultSession['user'];
  }
}
