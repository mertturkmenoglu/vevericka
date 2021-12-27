import type { NextPage } from 'next';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

export interface BookmarksPageProps {}

const Bookmarks: NextPage<BookmarksPageProps> = () => {
  return (
    <>
      <Head>
        <title>Bookmarks | Vevericka</title>
      </Head>
      <main className="w-screen h-screen flex items-center justify-center flex-col">
        <div>Bookmarks</div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<BookmarksPageProps> =
  async (context) => {
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

export default Bookmarks;
