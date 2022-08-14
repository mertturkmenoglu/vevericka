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
import clsx from 'clsx';
import { BadgeCheckIcon } from '@heroicons/react/solid';
import { Avatar } from '@atom/index';

export interface UserPageProps {
  user: GetUserByUsernameResponse;
  username: string;
  currentUser: GetUserByUsernameResponse;
  currentUserId: number;
}

const UserPage: NextPage<UserPageProps> = ({ user, username, currentUser }) => {
  const [, setAppUser] = useAtom(userAtom);
  const userImage = useUserImage(currentUser.image);

  useEffect(() => {
    setAppUser({
      email: currentUser.email,
      name: currentUser.name,
      image: userImage,
      userId: currentUser.id,
      username: currentUser.username,
    });
  }, [currentUser, setAppUser, userImage]);

  return (
    <>
      <Head>
        <title>{username} | Vevericka </title>
      </Head>
      <header>
        <AppBar
          className="mt-0 rounded-none md:mt-4"
          width="small"
        />
      </header>

      <main className={clsx('mx-4 mt-4 sm:mx-auto', 'max-w-3xl')}>
        <div className="flex flex-col items-center justify-center border-b-2 border-midnight pb-8 dark:border-white lg:mt-8 lg:flex-row lg:justify-start lg:pb-0">
          <Avatar
            src={userImage}
            label="Profile Picture"
            appearance="circle"
            size="xxlarge"
          />
          <div className="mt-8 flex flex-col items-center lg:mt-0 lg:ml-8 lg:items-start">
            <div className="flex items-center">
              <h1 className="mt-0 text-center text-4xl font-bold text-midnight dark:text-white">{user.name}</h1>
              {user.verified && <BadgeCheckIcon className="ml-1 mt-1 h-6 w-6 text-primary" />}
            </div>

            <h2 className="mt-2 text-lg font-medium text-primary">@{user.username}</h2>
          </div>
        </div>

        <div className="mx-auto mt-4 flex w-full">
          <pre className="mx-auto w-full rounded-md border-4 border-midnight py-3 px-2 text-midnight dark:border-white dark:text-white">
            {JSON.stringify({ currentUser, user }, null, 2)}
          </pre>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<UserPageProps> = async (context) => {
  const session = await getSession(context);
  const username = context.params?.username;

  if (typeof username !== 'string') {
    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    };
  }

  if (!session || !session.user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const userApi = new UserApi(session.jwt);

  const user = await userApi.getProfileByUsername(username);
  const currentUser = await userApi.getUserByUsername({ username: session.username });

  if (!user || !currentUser) {
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
      username,
      currentUser,
      currentUserId: session.id,
    },
  };
};

export default UserPage;
