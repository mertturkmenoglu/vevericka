import { useContext, useEffect } from 'react';
import Head from 'next/head';
import clsx from 'clsx';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTheme } from 'next-themes';
import { IUser } from '@service/models/IUser';
import { User } from '@service/User';
import { ApplicationContext } from '@context/ApplicationContext';
import { initContext } from '@utils/index';
import NotificationsLayout from '@layouts/NotificationsLayout';
import AppBar from '@components/AppBar';
import NotificationFeed from '@components/NotificationFeed';
import NotificationOptions from '@components/NotificationOptions';
import type { NextPage } from 'next';

export interface NotificationsPageProps {
  user: IUser;
  userId: number;
}

const Notifications: NextPage<NotificationsPageProps> = ({ user, userId }) => {
  const appContext = useContext(ApplicationContext);
  const { setTheme } = useTheme();

  useEffect(() => {
    initContext(appContext, user, userId);
    setTheme(appContext.isDarkTheme ? 'dark' : 'light');
  }, [appContext, user, setTheme, userId]);

  return (
    <>
      <Head>
        <title>Notifications | Vevericka</title>
      </Head>
      <header>
        <AppBar />
      </header>

      <main className="mt-4">
        <NotificationsLayout>
          <div className="col-span-8 h-full border-r-2 border-midnight border-opacity-10 dark:border-white dark:border-opacity-10">
            <NotificationFeed />
          </div>
          <div className="col-span-4 h-full">
            <NotificationOptions />
          </div>
        </NotificationsLayout>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<NotificationsPageProps> = async (context) => {
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
        destination: '/error',
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['auth', 'login'])),
      user,
      userId: session.id as number,
    },
  };
};

export default Notifications;
