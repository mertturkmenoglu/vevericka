import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Head from 'next/head';
import { useContext, useEffect, useMemo, useState } from 'react';
import { IUser } from '../service/models/IUser';
import { PostApi } from '../service/post/PostApi';
import { User } from '../service/User';
import AppBar from '../components/AppBar';
import CreatePost from '../components/CreatePost';
import HomePageFeed from '../components/HomePageFeed';
import ScrollToTopFab from '../components/ScrollToTopFab';
import { ApplicationContext } from '../context/ApplicationContext';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CreatePostModal from '../components/CreatePostModal';
import { FeedPost } from '../service/common/models/FeedPost';
import { PaginationOrder } from '../service/common/PaginationOrder';
import { PaginationQuery } from '../service/common/PaginationQuery';
import Spinner from '../atom/Spinner/Spinner';
import { QueryFunctionContext, useInfiniteQuery } from 'react-query';
import { PaginatedResults } from '../service/common/PaginatedResult';
import { ApiError } from '../service/common/ApiError';
import { initContext } from '../utils/initContext';
import MessagesMenu from '../components/MessagesMenu/MessagesMenu';
import clsx from 'clsx';
import Link from 'next/link';

export interface HomePageProps {
  user: IUser;
  userId: number;
  token: string;
}

const Home: NextPage<HomePageProps> = ({ user, userId, token }) => {
  const appContext = useContext(ApplicationContext);
  const { setTheme } = useTheme();
  const postApi = useMemo(() => new PostApi(token), [token]);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  const fetchFeed = async (context: QueryFunctionContext) => {
    const page = context.pageParam as number;

    const feedResponse = await postApi.getFeedByUsername(
      user.username,
      new PaginationQuery(PaginationOrder.DESC, page, 20),
    );

    if (!feedResponse.data) {
      throw feedResponse.exception;
    }

    return feedResponse.data;
  };

  const {
    isLoading,
    isError,
    data: feedData,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<PaginatedResults<FeedPost[]>, ApiError>('feed', fetchFeed, {
    getNextPageParam: (lastPage, _allPages) => lastPage.pagination.currentPage + 1,
  });

  useEffect(() => {
    initContext(appContext, user, userId);
    setTheme(appContext.isDarkTheme ? 'dark' : 'light');
  }, [appContext, user, setTheme, userId]);

  return (
    <>
      <Head>
        <title>Home | Vevericka</title>
      </Head>
      <header>
        <AppBar />
      </header>
      <main className="mx-auto flex  max-w-[1200px] grid-cols-12 gap-x-12 p-4 sm:grid">
        <div className="hidden xl:col-span-1 xl:flex"></div>

        <div className="home-feed__main-col col-span-full mx-auto sm:col-span-11 md:col-span-7 lg:col-span-6">
          <div className="flex w-full flex-col items-center">
            <div>
              <div className="w-full rounded-md bg-white p-2 dark:bg-neutral-800">
                <CreatePost
                  image={user?.image || ''}
                  name={user?.name || ''}
                  username={user?.username || ''}
                  openModal={setIsCreatePostModalOpen}
                />
                <CreatePostModal isOpen={isCreatePostModalOpen} setIsOpen={setIsCreatePostModalOpen} />
              </div>

              {isError && (
                <div className="mt-4 flex justify-center">
                  <p>An error happened</p>
                </div>
              )}

              {isLoading && (
                <div className="mt-4 flex justify-center">
                  <Spinner appearance="accent" spacing="medium" />
                </div>
              )}

              {feedData && (
                <HomePageFeed
                  feed={feedData.pages.map((page) => page.data).flat()}
                  isFetching={isFetchingNextPage}
                  onLoadMore={async () => {
                    await fetchNextPage();
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <div className="hidden lg:col-span-1 lg:flex"></div>

        <div className="hidden md:col-span-5 md:flex md:flex-col lg:col-span-4">
          <article className={clsx('rounded-md', 'text-midnight', 'p-2', 'bg-white dark:bg-neutral-800')}>
            <h2 className="border-b-2 border-midnight pb-2 text-xl font-bold dark:text-white">Explore</h2>
            <div className="mt-2 flex flex-col space-y-2">
              {[
                { tag: 'Vevericka 1', count: 123 },
                { tag: 'Vevericka 2', count: 120 },
                { tag: 'Vevericka 3', count: 100 },
                { tag: 'Vevericka 4', count: 90 },
              ].map((tagObj) => (
                <Link href={`/explore/${tagObj.tag}`} key={tagObj.tag}>
                  <a className="flex w-full items-end justify-between text-midnight outline-midnight dark:text-gray-400">
                    <span className="text-sm">
                      <span className="text-base font-bold text-primary">#</span>
                      <span className="ml-2 hover:underline focus:underline">{tagObj.tag}</span>
                    </span>
                    <span className="text-xs hover:underline focus:underline">{tagObj.count} posts</span>
                  </a>
                </Link>
              ))}
            </div>
            <div className="mt-4 w-full">
              <Link href="/explore">
                <a className="flex justify-end outline-none" tabIndex={-1}>
                  <span
                    className="rounded-full bg-midnight py-1 px-4 text-sm text-white outline-primary duration-100 ease-in-out hover:scale-[1.1]"
                    tabIndex={0}
                  >
                    More
                  </span>
                </a>
              </Link>
            </div>
          </article>
          <article className={clsx('rounded-md', 'text-midnight', 'mt-4 p-2', 'bg-white dark:bg-neutral-800')}>
            <h2 className="border-b-2 border-midnight pb-2 text-xl font-bold dark:text-white">People to follow</h2>
            <div className="mt-2 flex flex-col space-y-2">
              {[
                { username: 'adminmert', name: 'Mert Turkmenoglu', image: 'https://github.com/mertturkmenoglu.png' },
                { username: 'adminmert', name: 'Mert Turkmenoglu', image: 'https://github.com/mertturkmenoglu.png' },
                { username: 'adminmert', name: 'Mert Turkmenoglu', image: 'https://github.com/mertturkmenoglu.png' },
                { username: 'adminmert', name: 'Mert Turkmenoglu', image: 'https://github.com/mertturkmenoglu.png' },
              ].map((user) => (
                <div key={user.username} className="flex items-center justify-between">
                  <Link href={`/user/${user.username}`}>
                    <a className="flex w-full items-center justify-start text-midnight outline-midnight dark:text-gray-400">
                      <img src={user.image} alt="" className="h-10 w-10 rounded-full" />
                      <div className="ml-2 flex flex-col text-base">
                        <span className="text-lg font-bold">{user.name}</span>
                        <div>
                          <span className="text-base font-bold text-primary">@</span>
                          <span className="ml-1 hover:underline focus:underline">{user.username}</span>
                        </div>
                      </div>
                    </a>
                  </Link>
                  <button className="flex items-center justify-center rounded-full bg-midnight py-1 px-4 text-sm text-white outline-primary duration-100 ease-in-out hover:scale-[1.01]">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </article>
        </div>

        <MessagesMenu />
        <ScrollToTopFab bottom="bottom-4 sm:bottom-1" right="right-8 sm:right-[448px]" />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (context) => {
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

  const user = await userApi.getUserByUsername(session.username);

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
      ...(await serverSideTranslations(context.locale || 'en', ['auth', 'login'])),
      user,
      userId: session.id as number,
      token: session.jwt,
    },
  };
};

export default Home;
