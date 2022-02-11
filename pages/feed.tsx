import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Head from 'next/head';
import { useContext, useEffect } from 'react';
import { IPost } from '../backend/models/IPost';
import { IUser } from '../backend/models/IUser';
import { Post } from '../backend/Post';
import { User } from '../backend/User';
import AppBar from '../components/AppBar';
import CreatePost from '../components/CreatePost';
import HomePageFeed from '../components/HomePageFeed';
import ScrollToTopFab from '../components/ScrollToTopFab';
import Trending from '../components/Trending';
import { ApplicationContext } from '../context/ApplicationContext';
import { LocalStorage } from '../utils/LocalStorage';

export interface HomePageProps {
  user: IUser;
  userId: number;
  feed: IPost[];
}

const Home: NextPage<HomePageProps> = ({ user, userId, feed }) => {
  const appContext = useContext(ApplicationContext);
  const { setTheme } = useTheme();

  useEffect(() => {
    appContext.user.setEmail(user.email);
    appContext.user.setImage(user.image);
    appContext.user.setName(user.name);
    appContext.user.setUserId(userId);
    appContext.user.setUsername(user.username);
    const storage = new LocalStorage();
    appContext.setIsDarkTheme(storage.isDarkTheme);
    setTheme(storage.isDarkTheme ? 'dark' : 'light');
  });

  return (
    <>
      <Head>
        <title>Home | Vevericka</title>
      </Head>
      <header>
        <AppBar />
      </header>
      <main className="w-screen sm:w-10/12 md:w-3/4 mx-auto flex flex-col sm:flex-row sm:justify-between mt-4">
        <div className="flex flex-col w-full items-center">
          <div className="w-11/12 md:w-8/12">
            <div className="w-full bg-white dark:bg-neutral-800 p-2 rounded-md">
              <CreatePost
                image={user?.image || ''}
                name={user?.name || ''}
                username={user?.username || ''}
              />
            </div>
            <HomePageFeed feed={feed} />
          </div>
        </div>

        <div className="w-1/3 sm:w-2/3 md:w-1/3">
          <Trending />
        </div>

        <ScrollToTopFab />
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

  const userApi = new User(session.jwt);
  const postApi = new Post(session.jwt);
  const user = await userApi.getUserByUsername(session.username);
  const feed = await postApi.getFeedByUsername(session.username);

  if (!user) {
    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
      userId: session.id as number,
      feed: [],
    },
  };
};

export default Home;
