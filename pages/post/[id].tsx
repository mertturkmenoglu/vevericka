import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { User } from '../../service/User';
import { useContext, useEffect } from 'react';
import { ApplicationContext } from '../../context/ApplicationContext';
import { useTheme } from 'next-themes';
import { LocalStorage } from '../../utils/LocalStorage';
import Head from 'next/head';
import AppBar from '../../components/AppBar';
import { PostApi } from '../../service/post/PostApi';
import PostCard from '../../components/PostCard';
import { IUser } from '../../service/models/IUser';
import { IPost } from '../../service/models/IPost';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { SinglePost } from '../../service/common/models';

export interface PostPageProps {
  user: IUser;
  userId: number;
  post: SinglePost;
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

  return (
    <>
      <Head>
        <title>Post by {user.username} | Vevericka </title>
      </Head>
      <header>
        <AppBar />
      </header>
      <main className="mx-auto mt-4 w-screen rounded-md bg-white dark:bg-neutral-800 md:w-1/3">
        <div className="flex w-full flex-col items-center p-4">{JSON.stringify(post)}</div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PostPageProps> = async (context) => {
  const session = await getSession(context);
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
  const postApi = new PostApi(session.jwt);
  const user = await userApi.getUserByUsername(session.username);
  const post = await postApi.getPostById(parseInt(postId));

  if (!user || !post.data) {
    return {
      redirect: {
        destination: '/error?code=1',
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['auth', 'login'])),
      user,
      post: post.data,
      userId: session.id,
    },
  };
};

export default PostPage;
