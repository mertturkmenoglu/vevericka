import type { NextPage } from 'next';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import AppBar from '../components/AppBar';
import { useContext, useEffect } from 'react';
import { ApplicationContext } from '../context/ApplicationContext';
import { useTheme } from 'next-themes';
import IUser from '../legacy/src/api/responses/IUser';
import { LocalStorage } from '../utils/LocalStorage';
import { User } from '../api/User';

export interface BookmarksPageProps {
  user: IUser;
  userId: string;
}

const Bookmarks: NextPage<BookmarksPageProps> = ({ user, userId }) => {
  const appContext = useContext(ApplicationContext);
  const { setTheme } = useTheme();

  useEffect(() => {
    appContext.user.setEmail(user.email);
    appContext.user.setImage(user.image);
    appContext.user.setName(user.name);
    appContext.user.setUserId(userId);
    appContext.user.setUsername(user.username);
    const storage = new LocalStorage();
    appContext.setIsDarkTheme(storage.isDarkTheme);
    setTheme(storage.isDarkTheme ? 'dark' : 'light');
  }, []);

  return (
    <>
      <Head>
        <title>Bookmarks | Vevericka</title>
      </Head>
      <header>
        <AppBar />
      </header>
      <main className="w-full h-screen flex items-center justify-center flex-col">
        <div>Bookmarks</div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<BookmarksPageProps> =
  async (context) => {
    const session = await getSession(context);

    if (!session || !session.user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    const userApi = new User(session.jwt);
    const user = await userApi.getUserByUsername(session.username);

    if (!user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    return {
      props: {
        user,
        userId: session.userId,
      },
    };
  };

export default Bookmarks;
