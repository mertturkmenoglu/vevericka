import React, { useRef } from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { AppBar, PostCard } from '@components/index';
import { useAppUser, useUserImage } from '@hooks/index';
import clsx from 'clsx';
import { BadgeCheckIcon } from '@heroicons/react/solid';
import { Avatar } from '@atom/index';
import { useQuery } from 'react-query';
import { UserApi } from '@services/user';
import LoadingLayout from '@layouts/LoadingLayout';
import { Tab } from '@headlessui/react';
import { PostApi } from '@services/post';
import { PaginationOrder, PaginationQuery } from '@services/common';
import Link from 'next/link';

export interface UserPageProps {
  currentUsername: string;
  visitedUsername: string;
}

const UserPage: NextPage<UserPageProps> = ({ currentUsername, visitedUsername }) => {
  useAppUser({ username: currentUsername });
  const userApi = useRef(new UserApi());
  const postApi = useRef(new PostApi());

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery(['userProfile'], async () => {
    return userApi.current.getUserByUsername({ username: visitedUsername });
  });

  const {
    data: posts,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
  } = useQuery(['userPosts'], async () => {
    return postApi.current.getFeedByUsername(visitedUsername, new PaginationQuery(PaginationOrder.DESC, 1, 10));
  });

  const userImage = useUserImage(user?.image ?? '');

  if (!user || !posts) {
    return <></>;
  }

  return (
    <>
      <Head>
        <title>{visitedUsername} | Vevericka </title>
      </Head>
      <header>
        <AppBar
          className="mt-0 rounded-none md:mt-4"
          width="small"
        />
      </header>

      <main className={clsx('mx-4 mt-4 sm:mx-auto', 'max-w-3xl')}>
        <LoadingLayout
          isLoading={isLoading || isLoadingPosts}
          isError={isError || isErrorPosts}
        >
          <div className="flex flex-col items-center justify-center pb-8 lg:mt-8 lg:flex-row lg:justify-start lg:pb-0">
            <Avatar
              src={userImage}
              label="Profile Picture"
              appearance="circle"
              size="xxlarge"
            />
            <div className="mt-8 flex flex-col items-center lg:mt-0 lg:ml-8 lg:items-start">
              <div className="flex items-center">
                <h1 className="mt-0 text-center text-4xl font-bold text-midnight dark:text-white">{user.name}</h1>
                {user.verified && <BadgeCheckIcon className="ml-1 mt-1 h-6 w-6 text-primary" />}
              </div>

              <h2 className="mt-2 text-lg font-medium text-primary">@{user.username}</h2>
              <div className="space-x-2">
                <span className="text-sm font-semibold">{user.followingCount} Following</span>
                <span className="text-sm font-semibold">{user.followersCount} Followers</span>
              </div>
            </div>
            {user.isThisUser && (
              <Link href="/settings">
                <a className="mx-auto mt-4 rounded-full bg-midnight py-2 px-4 text-sm text-white hover:bg-midnight/90 lg:mx-0 lg:mt-0 lg:ml-auto">
                  Edit Your Profile
                </a>
              </Link>
            )}

            {!user.isThisUser && (
              <button className="mx-auto mt-4 rounded-full bg-midnight py-2 px-4 text-sm text-white hover:bg-midnight/90 lg:mx-0 lg:mt-0 lg:ml-auto">
                {user.isFollowedByThisUser ? 'Unfollow' : 'Follow'}
              </button>
            )}

            {}
          </div>

          <div className="mx-auto mt-4 w-full">
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl bg-white p-1 dark:bg-midnight/90">
                {['Posts', 'About', 'Likes'].map((category) => (
                  <Tab
                    key={category}
                    className={({ selected }) =>
                      clsx(
                        'focus:none w-full py-2.5 text-sm font-medium leading-5 text-midnight dark:text-white',
                        selected ? 'border-b-2 border-midnight dark:border-primary' : 'hover:hover:bg-midnight/5'
                      )
                    }
                  >
                    {category}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="mt-2 mb-8">
                {['posts', 'bio', 'likes'].map((tab, idx) => (
                  <Tab.Panel
                    key={idx}
                    className={clsx('rounded-xl p-3')}
                  >
                    {tab === 'posts' && (
                      <div className="space-y-2 divide-y-2 dark:divide-y-0">
                        {posts?.data?.data.length === 0 ? (
                          <div>Nothing to see here</div>
                        ) : (
                          posts?.data?.data.map((post) => (
                            <PostCard
                              post={post}
                              key={post.id}
                            />
                          ))
                        )}
                      </div>
                    )}

                    {tab === 'bio' && (
                      <div className="mx-auto mt-4 flex w-full">
                        <pre className="mx-auto w-full rounded-md border-4 border-midnight py-3 px-2 text-midnight dark:border-white dark:text-white">
                          {JSON.stringify({ user }, null, 2)}
                        </pre>
                      </div>
                    )}

                    {tab === 'likes' && <div>Coming soon</div>}
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </LoadingLayout>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<UserPageProps> = async (context) => {
  const session = await getSession(context);
  const visitedUsername = context.params?.username;

  if (typeof visitedUsername !== 'string') {
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

  return {
    props: {
      visitedUsername,
      currentUsername: session.username,
    },
  };
};

export default UserPage;
