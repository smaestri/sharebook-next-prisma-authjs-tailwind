import prisma from './lib/prisma';
import { betterAuth } from "better-auth";
import { prismaAdapter } from 'better-auth/adapters/prisma'

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  basePath: '/api/auth',
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: { 
    github: { 
      clientId: process.env.AUTH_GITHUB_ID as string, 
      clientSecret: process.env.AUTH_GITHUB_SECRET as string, 
    },
    google: { 
      clientId: process.env.AUTH_GOOGLE_ID as string, 
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string, 
    }, 
  }, 
})