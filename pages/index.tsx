import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { User } from '../api/User';
import AppBar from '../components/AppBar';
import CreatePost from '../components/CreatePost';
import Trending from '../components/Trending';
import { ApplicationContext } from '../context/ApplicationContext';
import IUser from '../legacy/src/api/responses/IUser';

export interface HomePageProps {}

const Home: NextPage<HomePageProps> = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const { data } = useSession();
  const appContext = useContext(ApplicationContext);

  useEffect(() => {
    if (data) {
      User.getUserByUsername(data.username).then((v) => {
        if (v) {
          setUser(v);
          appContext.user.setEmail(v.email);
          appContext.user.setImage(v.image);
          appContext.user.setName(v.name);
          appContext.user.setUserId(data.userId);
          appContext.user.setUsername(v.username);
        }
      });
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
      <main className="w-screen sm:w-10/12 md:w-3/4 mx-auto flex flex-col sm:flex-row sm:justify-between">
        {/* <pre>{JSON.stringify(data)}</pre>
        <pre>{JSON.stringify(user)}</pre> */}

        <div className="flex flex-col w-full items-center">
          <div className="w-8/12 sm:w-full md:w-8/12">
            <CreatePost
              image={user?.image || ''}
              name={user?.name || ''}
              username={user?.username || ''}
            />
          </div>
        </div>

        <div className="w-1/3 sm:w-2/3 md:w-1/3">
          <Trending />
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
