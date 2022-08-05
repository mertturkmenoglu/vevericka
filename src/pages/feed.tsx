import React, { useContext, useEffect } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import type { NextPage } from 'next';
import { AppBar } from '@components/AppBar';
import { GetUserByUsernameResponse, UserApi } from '@services/user';
import { AppContext } from '@context/AppContext';

export interface FeedPageProps {
  user: GetUserByUsernameResponse;
  userId: number;
  token: string;
}

const FeedPage: NextPage<FeedPageProps> = ({ user }) => {
  const ctx = useContext(AppContext);

  useEffect(() => {
    ctx.setUser((prev) => ({
      ...prev,
      email: user.email,
      name: user.name,
      image: user.image === 'profile.png' ? '/assets/profile.png' : user.image,
      userId: user.id,
      username: user.username,
    }));
  });

  return (
    <>
      <Head>
        <title>Vevericka</title>
      </Head>
      <header>
        <AppBar className="mt-0 lg:mt-4" />
      </header>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
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

export default FeedPage;
