import React, { useEffect } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import type { NextPage } from 'next';
import { GetUserByUsernameResponse, UserApi } from '@services/index';
import LoadingLayout from '@layouts/LoadingLayout';
import { HomepageFeed, AppBar } from '@components/index';
import { useUserImage } from '@hooks/index';
import { useAtom } from 'jotai';
import { userAtom } from '@context/jotai';
import { useHomepageFeed } from '@components/HomepageFeed/useHomepageFeed';

export interface FeedPageProps {
  user: GetUserByUsernameResponse;
  userId: number;
  token: string;
}

const FeedPage: NextPage<FeedPageProps> = ({ user, token }) => {
  const [, setAppUser] = useAtom(userAtom);
  const userImage = useUserImage(user.image);
  const { isLoading, isError, feedData, fetchNextPage, isFetchingNextPage } = useHomepageFeed({
    token,
    username: user.username,
  });

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
        <title>Vevericka</title>
      </Head>
      <header>
        <AppBar
          className="mt-0 rounded-none lg:mt-4"
          width="medium"
        />
      </header>
      <main className="mx-auto max-w-5xl">
        <LoadingLayout
          isLoading={isLoading}
          isError={isError}
        >
          {feedData && (
            <div className="w-full md:w-2/3">
              <HomepageFeed
                feed={feedData.pages.map((page) => page.data).flat()}
                isFetching={isFetchingNextPage}
                onLoadMore={async () => {
                  await fetchNextPage();
                }}
              />
            </div>
          )}
        </LoadingLayout>
      </main>
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
