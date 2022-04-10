import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { IUser } from '@service/models/IUser';
import { User } from '@service/User';
import { useContext, useEffect, useMemo } from 'react';
import { ApplicationContext } from '@context/ApplicationContext';
import { useTheme } from 'next-themes';
import Head from 'next/head';
import AppBar from '@components/AppBar';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { initContext } from '@utils/initContext';
import clsx from 'clsx';
import { Profile } from '@service/common/models/Profile';
import Link from 'next/link';
import { BadgeCheckIcon } from '@heroicons/react/solid';
import format from 'date-fns/format';

export interface UserPageProps {
  username: string;
  user: Profile;
  currentUser: IUser;
  currentUserId: number;
}

const UserPage: NextPage<UserPageProps> = ({ username, user, currentUser, currentUserId }) => {
  const appContext = useContext(ApplicationContext);
  const { setTheme } = useTheme();

  useEffect(() => {
    initContext(appContext, currentUser, currentUserId);
    setTheme(appContext.isDarkTheme ? 'dark' : 'light');
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
      <main className={clsx('mx-4 mt-4 sm:mx-auto', 'rounded-md', ' bg-white dark:bg-neutral-800', 'md:w-2/3')}>
        <div className="flex flex-col items-center justify-center rounded-md border-4 border-midnight p-16 pb-8">
          <div className="flex flex-col items-center justify-center lg:flex-row">
            <div>
              <img src={image} alt="Profile Picture" className="h-64 w-64 rounded-full" />
            </div>
            <div className="mt-16 flex flex-col items-center lg:mt-0 lg:ml-32">
              <div className="flex items-center">
                <h1 className="mt-0 text-center text-4xl font-bold text-midnight">{user.name}</h1>
                {user.verified && <BadgeCheckIcon className="ml-1 mt-1 h-6 w-6 text-primary" />}
              </div>

              <h2 className="mt-2 text-lg font-medium text-primary">@{user.username}</h2>
              <div className="mt-8 flex space-x-4">
                <div className="flex flex-col items-center">
                  <span className="text-sm">Posts</span>
                  <span className="text-3xl text-midnight">{user.postsCount}</span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-sm">Followers</span>
                  <span className="text-3xl text-midnight">{user.followersCount}</span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-sm">Following</span>
                  <span className="text-3xl text-midnight">{user.followingCount}</span>
                </div>
              </div>
              {user.isThisUser && (
                <Link href="/settings">
                  <a className="mt-8 rounded-md bg-midnight py-2 px-4 text-white">Update your profile</a>
                </Link>
              )}
              {user.isFollowedByThisUser && !user.isThisUser && (
                <button className="mt-8 rounded-md bg-midnight py-2 px-4 text-white">
                  <span>Following</span>
                </button>
              )}
              {!user.isFollowedByThisUser && !user.isThisUser && (
                <button className="mt-8 rounded-md bg-midnight py-2 px-4 text-white">
                  <span>Follow</span>
                </button>
              )}
            </div>
          </div>
          <div className="mt-8">
            <p className="text-xl font-semibold italic text-midnight">{user.description}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-col lg:grid lg:grid-cols-12 lg:gap-x-4">
          <div className="col-span-3 rounded-md border-4 border-midnight py-4 px-2 text-midnight">
            {user.job && <p className="text-base font-semibold">Job: {user.job}</p>}
            {user.twitterHandle && <p className="text-base font-semibold">Twitter: @{user.twitterHandle}</p>}
            {user.school && <p className="text-base font-semibold">School: {user.school}</p>}
            {user.birthDate && (
              <p className="text-base font-semibold">
                Birth Date: {format(new Date(user.birthDate || Date.now()), 'P')}
              </p>
            )}
            {user.website && <p className="text-base font-semibold">Website: {user.website}</p>}
            {user.gender !== 'OTHER' && user.gender !== null && (
              <p className="text-base font-semibold">Gender: {JSON.stringify(user.gender)}</p>
            )}
            {user.genderOther && (
              <p className="text-base font-semibold">Gender Other: {JSON.stringify(user.genderOther)}</p>
            )}
            {user.city && <p className="text-base font-semibold">City: {JSON.stringify(user.city)}</p>}
            {user.country && <p className="text-base font-semibold">Country: {JSON.stringify(user.country)}</p>}
            <p className="text-base font-semibold">Joined: {format(new Date(user.createdAt), 'MMM Y')}</p>
            {user.speaking.length > 0 && (
              <p className="text-base font-semibold">Speaking: {JSON.stringify(user.speaking)}</p>
            )}
            {user.wishToSpeak.length > 0 && (
              <p className="text-base font-semibold">Wish to speak: {JSON.stringify(user.wishToSpeak)}</p>
            )}
            {user.features.length > 0 && (
              <p className="text-base font-semibold">features: {JSON.stringify(user.features)}</p>
            )}
            {user.hobbies.length > 0 && (
              <p className="text-base font-semibold">Hobbies: {JSON.stringify(user.hobbies)}</p>
            )}
          </div>
          <div className="col-span-9 rounded-md border-4 border-midnight py-3 px-2 text-midnight">b</div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<UserPageProps> = async (context) => {
  const session = await getSession(context);
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
  const user = await userApi.getProfileByUsername(username);
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
      ...(await serverSideTranslations(context.locale || 'en', ['auth', 'login'])),
      user,
      username,
      currentUser,
      currentUserId: session.id,
    },
  };
};

export default UserPage;
