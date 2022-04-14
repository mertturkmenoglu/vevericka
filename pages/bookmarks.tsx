import { useContext, useEffect } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTheme } from 'next-themes';
import { IUser } from '@service/models/IUser';
import { User } from '@service/User';
import { ApplicationContext } from '@context/ApplicationContext';
import { initContext } from '@utils/index';
import AppBar from '@components/AppBar';
import type { NextPage } from 'next';

export interface BookmarksPageProps {
  user: IUser;
  userId: number;
}

const Bookmarks: NextPage<BookmarksPageProps> = ({ user, userId }) => {
  const appContext = useContext(ApplicationContext);
  const { setTheme } = useTheme();

  useEffect(() => {
    initContext(appContext, user, userId);
    setTheme(appContext.isDarkTheme ? 'dark' : 'light');
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

export const getServerSideProps: GetServerSideProps<BookmarksPageProps> = async (context) => {
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
      ...(await serverSideTranslations(context.locale || 'en', ['auth', 'login'])),
      user,
      userId: session.id,
    },
  };
};

export default Bookmarks;
