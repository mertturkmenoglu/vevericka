import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import type { NextPage } from 'next';
import LoadingLayout from '@layouts/LoadingLayout';
import { HomepageFeed, AppBar, MessageBox } from '@components/index';
import { useAppUser } from '@hooks/index';
import { useHomepageFeed } from '@components/HomepageFeed/useHomepageFeed';

export interface FeedPageProps {
  username: string;
}

const FeedPage: NextPage<FeedPageProps> = ({ username }) => {
  useAppUser({ username });

  const { isLoading, isError, feedData, fetchNextPage, isFetchingNextPage } = useHomepageFeed({
    username,
  });

  return (
    <>
      <Head>
        <title>Vevericka</title>
      </Head>
      <header>
        <AppBar
          className="mt-0 rounded-none md:mt-4"
          width="small"
        />
      </header>
      <main className="mx-auto flex max-w-5xl">
        <LoadingLayout
          isLoading={isLoading}
          isError={isError}
          className="mx-auto"
        >
          {feedData && (
            <div className="mx-auto w-full md:w-2/3">
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

      <MessageBox />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<FeedPageProps> = async (context) => {
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

export default FeedPage;
