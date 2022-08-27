import React, { useRef } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import type { NextPage } from 'next';
import { AppBar } from '@components/index';
import { useAppUser, useUserImage } from '@hooks/index';
import clsx from 'clsx';
import { BadgeCheckIcon } from '@heroicons/react/solid';
import { Avatar } from '@atom/index';
import { useQuery } from 'react-query';
import { UserApi } from '@services/user';
import LoadingLayout from '@layouts/LoadingLayout';

export interface UserPageProps {
  currentUsername: string;
  visitedUsername: string;
}

const UserPage: NextPage<UserPageProps> = ({ currentUsername, visitedUsername }) => {
  useAppUser({ username: currentUsername });
  const userApi = useRef(new UserApi());

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery(['userProfile'], async () => {
    return userApi.current.getUserByUsername({ username: visitedUsername });
  });

  const userImage = useUserImage(user?.image ?? '');

  if (user === null) {
    return <></>;
  }

  return (
    <>
      <Head>
        <title>{visitedUsername} | Vevericka </title>
      </Head>
      <header>
        <AppBar
          className="mt-0 rounded-none md:mt-4"
          width="small"
        />
      </header>

      <main className={clsx('mx-4 mt-4 sm:mx-auto', 'max-w-3xl')}>
        <LoadingLayout
          isLoading={isLoading}
          isError={isError}
        >
          <div className="flex flex-col items-center justify-center border-b-2 border-midnight pb-8 dark:border-white lg:mt-8 lg:flex-row lg:justify-start lg:pb-0">
            <Avatar
              src={userImage}
              label="Profile Picture"
              appearance="circle"
              size="xxlarge"
            />
            <div className="mt-8 flex flex-col items-center lg:mt-0 lg:ml-8 lg:items-start">
              <div className="flex items-center">
                <h1 className="mt-0 text-center text-4xl font-bold text-midnight dark:text-white">{user?.name}</h1>
                {user?.verified && <BadgeCheckIcon className="ml-1 mt-1 h-6 w-6 text-primary" />}
              </div>

              <h2 className="mt-2 text-lg font-medium text-primary">@{user?.username}</h2>
            </div>
          </div>

          <div className="mx-auto mt-4 flex w-full">
            <pre className="mx-auto w-full rounded-md border-4 border-midnight py-3 px-2 text-midnight dark:border-white dark:text-white">
              {JSON.stringify({ user }, null, 2)}
            </pre>
          </div>
        </LoadingLayout>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<UserPageProps> = async (context) => {
  const session = await getSession(context);
  const visitedUsername = context.params?.username;

  if (typeof visitedUsername !== 'string') {
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

  return {
    props: {
      visitedUsername,
      currentUsername: session.username,
    },
  };
};

export default UserPage;
