import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import type { NextPage } from 'next';
import { AppBar, SearchSection } from '@components/index';
import { useAppUser } from '@hooks/index';

export interface SearchPageProps {
  username: string;
}

const SearchPage: NextPage<SearchPageProps> = ({ username }) => {
  useAppUser({ username });

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
      <main className="mx-auto mt-8 flex max-w-3xl">
        <SearchSection />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async (context) => {
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

export default SearchPage;
