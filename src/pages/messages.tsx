import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import type { NextPage } from 'next';
import { AppBar } from '@components/index';
import { useAppUser, useUserImage } from '@hooks/index';
import { Avatar } from '@atom/Avatar';
import { ChevronDownIcon, EllipsisVerticalIcon, PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export interface MessagesPageProps {
  username: string;
}

const MessagesPage: NextPage<MessagesPageProps> = ({ username }) => {
  const { data } = useAppUser({ username });
  const userImage = useUserImage(data?.image ?? '');

  return (
    <>
      <Head>
        <title>Messages | Vevericka</title>
      </Head>
      <header>
        <AppBar
          className="mt-0 rounded-none md:mt-4"
          width="small"
        />
      </header>
      <main className="mx-auto flex max-w-7xl">
        <section className="mt-4 flex h-[80vh] w-full items-start space-x-1 rounded-xl p-2 dark:border-white">
          <section className="flex h-full w-1/3 flex-col">
            <div className="flex h-32 items-center justify-between border-b border-midnight bg-white py-2 dark:border-white dark:bg-neutral-800">
              <div className="invisible sm:visible">
                <Avatar
                  src={userImage}
                  size="large"
                  appearance="circle"
                  label="user image"
                  className="ml-2"
                />
              </div>
              <div className="flex items-center space-x-2">
                <button className="rounded-full p-2 hover:bg-paper-200 hover:bg-opacity-10">
                  <PencilIcon className="h-8 w-8 text-midnight dark:text-white" />
                </button>

                <button className="rounded-full p-2 hover:bg-paper-200 hover:bg-opacity-10">
                  <ChevronDownIcon className="h-8 w-8 text-midnight dark:text-white" />
                </button>
              </div>
            </div>

            <div className="mt-2 flex flex-col space-y-2 overflow-y-auto">
              {[
                1, 2, 3, 4, 5, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1,
              ].map((_e, i) => (
                <button
                  key={i}
                  className="mr-2 flex items-center justify-between bg-neutral-100 py-2 px-4 hover:bg-opacity-60 dark:bg-neutral-800 dark:hover:bg-opacity-60"
                >
                  <div className="flex items-center">
                    <div className="hidden sm:flex">
                      <Avatar
                        src={'https://i.pravatar.cc/48'}
                        size="medium"
                        appearance="circle"
                        label="user image"
                        className="object-cover"
                      />
                    </div>

                    <div className="ml-0 flex flex-col items-start sm:ml-4">
                      <span className="text-start font-semibold">Lorem Ipsum</span>
                      <span className="text-start text-sm">Dolor sit amet</span>
                    </div>
                  </div>

                  <div className="hidden h-full text-xs text-paper-300 lg:flex">22 hours ago</div>
                </button>
              ))}
            </div>
          </section>
          <section className="flex h-full w-2/3 flex-col">
            <div className="flex h-20 items-center justify-between bg-white py-2 px-4">
              <div className="flex items-center">
                <Avatar
                  src={'https://i.pravatar.cc/48'}
                  size="large"
                  appearance="circle"
                  label="user image"
                  className="object-cover"
                />

                <Link href="/">
                  <a className="ml-4 flex h-full flex-col justify-center">
                    <span className="text-xl font-semibold">Lorem Ipsum</span>
                    <span className="text-sm">Online</span>
                  </a>
                </Link>
              </div>

              <div className="flex items-center">
                <button className="flex items-center rounded-full p-2 hover:bg-paper-200 hover:bg-opacity-10">
                  <EllipsisVerticalIcon className="h-6 w-6 text-midnight" />
                </button>
              </div>
            </div>
            <hr className="h-[1px] border-t border-midnight" />
            <div className="mt-2 h-[66vh] bg-yellow-300">Middle</div>
            <div className="border-t border-midnight "></div>
          </section>
        </section>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<MessagesPageProps> = async (context) => {
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
    props: {
      username: session.username,
    },
  };
};

export default MessagesPage;
