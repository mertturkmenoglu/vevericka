import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Auth } from '../../../backend/Auth';

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

        const response = await Auth.login(
          credentials.email,
          credentials.password
        );

        if (!response) {
          return null;
        }

        return {
          email: credentials.email,
          id: response.id,
          username: response.username,
          token: response.token,
          image: response.image,
        };
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.email = user?.email;
        token.id = user?.id;
        token.username = user?.username;
        token.jwt = user?.token;
      }

      return token;
    },
    session: ({ session, token }) => {
      session.email = token.email || '';
      session.id = token.id as number;
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
