import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { useContext, useEffect } from 'react';
import { Post } from '../api/Post';
import { User } from '../api/User';
import AppBar from '../components/AppBar';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';
import Trending from '../components/Trending';
import { ApplicationContext } from '../context/ApplicationContext';
import IPost from '../legacy/src/api/responses/IPost';
import IUser from '../legacy/src/api/responses/IUser';

export interface HomePageProps {
  user: IUser;
  userId: string;
  feed: IPost[];
}

const Home: NextPage<HomePageProps> = ({ user, userId, feed }) => {
  const appContext = useContext(ApplicationContext);

  useEffect(() => {
    appContext.user.setEmail(user.email);
    appContext.user.setImage(user.image);
    appContext.user.setName(user.name);
    appContext.user.setUserId(userId);
    appContext.user.setUsername(user.username);
  }, []);

  return (
    <>
      <Head>
        <title>Home | Vevericka</title>
      </Head>
      <header>
        <AppBar />
      </header>
      <main className="w-screen sm:w-10/12 md:w-3/4 mx-auto flex flex-col sm:flex-row sm:justify-between">
        <div className="flex flex-col w-full items-center">
          <div className="w-8/12 sm:w-full md:w-8/12">
            <CreatePost
              image={user?.image || ''}
              name={user?.name || ''}
              username={user?.username || ''}
            />
            <div className="divide-y-2 space-y-2">
              {feed.map((post) => (
                <div key={post._id}>
                  <PostCard post={post} />
                </div>
              ))}
            </div>
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

  const userApi = new User(session.jwt);
  const postApi = new Post(session.jwt);
  const user = await userApi.getUserByUsername(session.username);
  const feed = await postApi.getFeedByUsername(session.username);

  if (!user || !feed) {
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
      userId: session.userId,
      feed,
    },
  };
};

export default Home;
