import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession } from 'next-auth/react';

export interface ExplorePageProps {}

const Explore: NextPage<ExplorePageProps> = () => {
  return (
    <>
      <Head>
        <title>Explore | Vevericka</title>
      </Head>
      <main className="flex h-screen w-screen flex-col items-center justify-center">
        <div>Explore</div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ExplorePageProps> = async (
  context
) => {
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
    props: {},
  };
};

export default Explore;
