import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const demoEmail = process.env.DEMO_USER_EMAIL ?? 'demo@example.com';
const demoPassword = process.env.DEMO_USER_PASSWORD ?? 'password123';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'Demo Account',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        if (credentials.email === demoEmail && credentials.password === demoPassword) {
          return {
            id: 'demo-user',
            name: 'Demo User',
            email: demoEmail
          };
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: '/signin'
  }
};
