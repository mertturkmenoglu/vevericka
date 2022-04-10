import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession } from 'next-auth/react';

export interface MessagesPageProps {}

const Messages: NextPage<MessagesPageProps> = () => {
  return (
    <>
      <Head>
        <title>Messages | Vevericka</title>
      </Head>
      <main className="flex h-screen w-screen flex-col items-center justify-center">
        <div>Messages</div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<MessagesPageProps> = async (context) => {
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

export default Messages;
