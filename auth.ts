import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import prisma from './lib/prisma';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    
  ],
  callbacks: {
    session({ session, user } :any) {
      // As seen on https://authjs.dev/guides/role-based-access-control
      if (user?.id) session.user.id = user.id;
      if (user?.role) session.user.role = user.role;
      return session;
    }
  }
};

export const {
  handlers,
  auth,
  signOut,
  signIn,
} = NextAuth(authOptions);