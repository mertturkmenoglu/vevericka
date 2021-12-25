import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { User } from '../api/User';
import AppBar from '../components/AppBar';
import CreatePost from '../components/CreatePost';
import IUser from '../legacy/src/api/responses/IUser';

export interface HomePageProps {}

const Home: NextPage<HomePageProps> = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const { data } = useSession();

  useEffect(() => {
    if (data) {
      User.getUserByUsername(data.username).then((v) => setUser(v));
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>Home | Vevericka</title>
      </Head>
      <header>
        <AppBar />
      </header>
      <main className="w-screen flex justify-center">
        {/* <pre>{JSON.stringify(data)}</pre>
        <pre>{JSON.stringify(user)}</pre> */}

        <div className="flex flex-col w-10/12 sm:w-1/2 md:w-1/3 ">
          <CreatePost
            image={user?.image || ''}
            name={user?.name || ''}
            username={user?.username || ''}
          />
        </div>
      </main>
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
