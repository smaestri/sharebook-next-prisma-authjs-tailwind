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
    })
  ]
};

export const {
  handlers,
  auth,
  signOut,
  signIn,
} = NextAuth(authOptions);