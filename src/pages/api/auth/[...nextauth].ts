import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthApi } from '@services/auth';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';

const nextAuthOptions = (_req: NextApiRequest, res: NextApiResponse): NextAuthOptions => {
  return {
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

          const api = new AuthApi();
          const response = await api.login({
            email: credentials.email,
            password: credentials.password,
          });

          if (!response) {
            return null;
          }

          res.setHeader('Set-Cookie', response.headers['set-cookie'] ?? '');

          return {
            email: credentials.email,
            username: response.data.username,
          };
        },
      }),
    ],
    callbacks: {
      jwt: ({ token, user }) => {
        if (user) {
          token.email = user?.email;
          token.username = user?.username;
        }

        return token;
      },
      session: ({ session, token }) => {
        session.email = token.email || '';
        session.username = token.username as string;

        return session;
      },
    },
    pages: {
      signIn: '/login',
    },
    secret: process.env.JWT_SECRET,
  };
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};
