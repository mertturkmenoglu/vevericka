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

export interface UserPageProps {
  username: string;
  user: IUser;
  currentUser: IUser;
  currentUserId: string;
}

const UserPage: NextPage<UserPageProps> = ({
  username,
  user,
  currentUser,
  currentUserId,
}) => {
  const appContext = useContext(ApplicationContext);
  const { setTheme } = useTheme();

  useEffect(() => {
    appContext.user.setEmail(currentUser.email);
    appContext.user.setImage(currentUser.image);
    appContext.user.setName(currentUser.name);
    appContext.user.setUserId(currentUserId);
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
        <title>{username} | Vevericka </title>
      </Head>
      <header>
        <AppBar />
      </header>
      <main className="w-screen mt-4 bg-neutral-100 dark:bg-neutral-800 md:w-2/3 mx-auto rounded-md">
        <div className="flex flex-col p-4 items-center">
          <div className="w-full flex items-center justify-center rounded-md py-4">
            <img
              src={image}
              alt="Profile Picture"
              className="w-48 h-48 rounded-full border-4 border-deep-orange dark:border-white"
            />
          </div>
          <h1 className="mt-8 text-3xl font-medium text-slate-700 dark:text-gray-200">
            {user.name}
          </h1>
          <h2 className="mt-2 font-medium text-deep-orange">
            @{user.username}
          </h2>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<UserPageProps> = async (
  context
) => {
  const session = await getSession(context);
  // const isAuth = !(!session || !session.user);
  const username = context.params?.username;

  if (typeof username !== 'string') {
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
  const user = await userApi.getUserByUsername(username);
  const currentUser = await userApi.getUserByUsername(session.username);

  if (!user || !currentUser) {
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
      username,
      currentUser,
      currentUserId: session.userId,
    },
  };
};

export default UserPage;