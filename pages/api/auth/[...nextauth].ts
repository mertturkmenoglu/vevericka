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
  pages: {
    signIn: '/login',
  },
  secret: process.env.JWT_SECRET,
});