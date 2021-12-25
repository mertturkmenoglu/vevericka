import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { getSession, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';

export interface HomePageProps {}

const Home: NextPage<HomePageProps> = () => {
  const { data, status } = useSession();
  return (
    <>
      <Head>
        <title>Home | Vevericka</title>
      </Head>
      <div>Home</div>
      <div>{data?.user?.email}</div>
      <button
        onClick={async () => {
          await signOut();
        }}
      >
        Sign out
      </button>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
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

export default Home;
