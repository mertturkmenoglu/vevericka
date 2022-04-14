import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Hit } from '../components/Hit';
import { Hits } from '../components/Hits';
import { SearchBox } from '../components/SearchBox';
import type { NextPage } from 'next';

export interface SearchPageProps {}

const Search: NextPage<SearchPageProps> = ({}) => {
  return (
    <>
      <Head>
        <title>Search | Vevericka</title>
      </Head>
      <main className="mx-auto mt-4 flex w-screen flex-col sm:w-10/12 sm:flex-row sm:justify-between md:w-3/4">
        <SearchBox />
        <Hits hitComponent={Hit} />
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
      ...(await serverSideTranslations(context.locale || 'en', ['auth', 'login'])),
    },
  };
};

export default Search;
