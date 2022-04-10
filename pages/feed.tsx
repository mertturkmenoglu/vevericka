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
      <main className="mx-auto mt-4 flex w-11/12 flex-col sm:w-10/12 sm:flex-row sm:justify-between md:w-8/12 lg:w-6/12 xl:w-5/12 2xl:w-4/12">
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
