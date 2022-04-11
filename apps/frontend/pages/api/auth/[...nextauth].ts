import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import DiscordProvider from 'next-auth/providers/discord';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  pages: {
    signIn: '/signin',
    signOut: '/signin?signOut=true',
    error: '/signin',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('SIGNIN: ', user, account, profile, email, credentials);
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log('REDIRECT: ', url, baseUrl);
      return baseUrl;
    },
    async session({ session, user, token }) {
      console.log('SESSION: ', session, user, token);
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log('JWT: ', token, user, account, profile, isNewUser);
      return token;
    },
  },
});
