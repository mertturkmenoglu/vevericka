import React, { useEffect } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import type { NextPage } from 'next';
import { GetUserByUsernameResponse, UserApi } from '@services/user';
import { AppBar } from '@components/index';
import { useUserImage } from '@hooks/index';
import { useAtom } from 'jotai';
import { userAtom } from '@context/jotai';

export interface NotificationsPageProps {
  user: GetUserByUsernameResponse;
  userId: number;
  token: string;
}

const NotificationsPage: NextPage<NotificationsPageProps> = ({ user }) => {
  const [, setAppUser] = useAtom(userAtom);
  const userImage = useUserImage(user.image);

  useEffect(() => {
    setAppUser({
      email: user.email,
      name: user.name,
      image: userImage,
      userId: user.id,
      username: user.username,
    });
  }, [user, setAppUser, userImage]);

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

  const userApi = new UserApi(session.jwt);

  const user = await userApi.getUserByUsername({ username: session.username });

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
      user,
      userId: session.id as number,
      token: session.jwt,
    },
  };
};

export default NotificationsPage;
