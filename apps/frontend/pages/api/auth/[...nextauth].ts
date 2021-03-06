import NextAuth from 'next-auth';
import nodemailer from 'nodemailer';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import DiscordProvider from 'next-auth/providers/discord';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import config from 'lib/config';
import { html, text } from 'lib/email';

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
    EmailProvider({
      server: config.smtp.server,
      from: config.smtp.from,
      async sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
      }) {
        const { host } = new URL(url);
        const transport = nodemailer.createTransport(server);
        await transport.sendMail({
          to: email,
          from,
          subject: `Sign in to ${host}`,
          text: text({ url, host }),
          html: html({ url, host, email }),
        });
      },
    }),
  ],
  secret: config.secret,
  pages: {
    signIn: '/signin',
    signOut: '/signin',
    error: '/signin',
    verifyRequest: '/verify-request',
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
