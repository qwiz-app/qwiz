import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import DiscordProvider from 'next-auth/providers/discord';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import config from 'lib/config';

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: config.google.clientId,
      clientSecret: config.google.clientSecret,
    }),
    GitHubProvider({
      clientId: config.github.clientId,
      clientSecret: config.github.clientSecret,
    }),
    DiscordProvider({
      clientId: config.discord.clientId,
      clientSecret: config.discord.clientId,
    }),
  ],
  secret: config.secret,
  pages: {
    signIn: '/signin',
    // TODO: isnt doing anything
    signOut: '/signin?signOut=true',
    error: '/signin',
  },
  callbacks: {
    async session({ session, user }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          id: user.id,
        },
      });
      session.user.role = dbUser.role || null;

      return session;
    },
  },
});
