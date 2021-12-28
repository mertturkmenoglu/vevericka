import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import IUser from '../../legacy/src/api/responses/IUser';
import { User } from '../../api/User';
import { useContext, useEffect, useMemo } from 'react';
import { ApplicationContext } from '../../context/ApplicationContext';
import { useTheme } from 'next-themes';
import { LocalStorage } from '../../utils/LocalStorage';
import Head from 'next/head';
import AppBar from '../../components/AppBar';
import IPost from '../../legacy/src/api/responses/IPost';
import { Post } from '../../api/Post';
import PostCard from '../../components/PostCard';

export interface PostPageProps {
  user: IUser;
  userId: string;
  post: IPost;
}

const PostPage: NextPage<PostPageProps> = ({ user, userId, post }) => {
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

  const image = useMemo(() => {
    if (user.image === 'profile.png') {
      return '/assets/profile.png';
    }

    return user.image;
  }, [user]);

  return (
    <>
      <Head>
        <title>Post by {user.username} | Vevericka </title>
      </Head>
      <header>
        <AppBar />
      </header>
      <main className="w-screen mt-4 bg-white dark:bg-neutral-800 md:w-1/3 mx-auto rounded-md">
        <div className="flex flex-col p-4 items-center">
          <PostCard post={post} />
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PostPageProps> = async (
  context
) => {
  const session = await getSession(context);
  // const isAuth = !(!session || !session.user);
  const postId = context.params?.id;

  if (typeof postId !== 'string') {
    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    };
  }

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
  const post = await postApi.getPostById(postId);

  if (!user || !post) {
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
      post,
      userId: session.userId,
    },
  };
};

export default PostPage;
