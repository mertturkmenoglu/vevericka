import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession } from 'next-auth/react';
import AppBar from '../components/AppBar';
import { useContext, useEffect } from 'react';
import { ApplicationContext } from '../context/ApplicationContext';
import { useTheme } from 'next-themes';
import { LocalStorage } from '../utils/LocalStorage';
import { User } from '../backend/User';
import { IUser } from '../backend/models/IUser';

export interface BookmarksPageProps {
  user: IUser;
  userId: number;
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
  });

  return (
    <>
      <Head>
        <title>Bookmarks | Vevericka</title>
      </Head>
      <header>
        <AppBar />
      </header>
      <main className="flex h-screen w-full flex-col items-center justify-center">
        <div>Bookmarks</div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  BookmarksPageProps
> = async (context) => {
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
      userId: session.id,
    },
  };
};

export default Bookmarks;
