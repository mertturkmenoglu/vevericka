import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Auth } from '../../../api/Auth';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const response = await Auth.login(credentials.email, credentials.password);

        if (!response) {
          return null;
        }

        return {
          email: credentials.email,
          userId: response.userId,
          username: response.username,
          token: response.token,
        };
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.email = user?.email;
        token.userId = user?.userId;
        token.username = user?.username;
        token.jwt = user?.token;
      }

      return token;
    },
    session: ({ session, token }) => {
      session.email = token.email || '';
      session.userId = token.userId as string;
      session.username = token.username as string;
      session.jwt = token.jwt as string;

      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.JWT_SECRET,
});