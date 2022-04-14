import { useContext, useEffect } from 'react';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { getSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTheme } from 'next-themes';

import { User } from '@service/User';
import { IUser } from '@service/models/IUser';

import { ApplicationContext } from '@context/ApplicationContext';
import { initContext } from '@utils/index';

import MessagesLayout from '@layouts/MessagesLayout';
import AppBar from '@components/AppBar';
import LatestMessages from '@components/LatestMessages';
import ConversationPanel from '@components/ConversationPanel';
import clsx from 'clsx';

export interface MessagesPageProps {
  user: IUser;
  userId: number;
}

const Messages: NextPage<MessagesPageProps> = ({ user, userId }) => {
  const appContext = useContext(ApplicationContext);
  const { setTheme } = useTheme();

  useEffect(() => {
    initContext(appContext, user, userId);
    setTheme(appContext.isDarkTheme ? 'dark' : 'light');
  }, [appContext, user, setTheme, userId]);

  return (
    <>
      <Head>
        <title>Messages | Vevericka</title>
      </Head>
      <header>
        <AppBar />
      </header>
      <main className="mt-4">
        <MessagesLayout
          className={clsx(
            'border-2',
            'border-midnight border-opacity-10',
            'dark:border-white dark:border-opacity-10',
            '',
          )}
        >
          <div className="col-span-4 h-full">
            <LatestMessages />
          </div>
          <div className="col-span-8 h-full">
            <ConversationPanel />
          </div>
        </MessagesLayout>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<MessagesPageProps> = async (context) => {
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

export default Messages;
