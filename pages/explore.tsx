import type { NextPage } from 'next';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

export interface ExplorePageProps {}

const Explore: NextPage<ExplorePageProps> = () => {
  return (
    <>
      <Head>
        <title>Explore | Vevericka</title>
      </Head>
      <main className="w-screen h-screen flex items-center justify-center flex-col">
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
