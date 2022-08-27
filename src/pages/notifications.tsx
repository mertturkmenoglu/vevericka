import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import type { NextPage } from 'next';
import { AppBar } from '@components/index';
import { useAppUser } from '@hooks/index';

export interface NotificationsPageProps {
  username: string;
}

const NotificationsPage: NextPage<NotificationsPageProps> = ({ username }) => {
  useAppUser({ username });

  return (
    <>
      <Head>
        <title>Notifications | Vevericka</title>
      </Head>
      <header>
        <AppBar
          className="mt-0 rounded-none md:mt-4"
          width="small"
        />
      </header>
      <main className="mx-auto mt-8 flex max-w-3xl">
        <div className="flex w-full justify-center">
          <h2 className="mt-8 text-xl">You don&apos;t have any notifications</h2>
        </div>
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

  return {
    props: {
      username: session.username,
    },
  };
};

export default NotificationsPage;
