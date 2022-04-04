import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { IPost } from '../service/models/IPost';
import { IUser } from '../service/models/IUser';
import { PostApi } from '../service/post/PostApi';
import { User } from '../service/User';
import AppBar from '../components/AppBar';
import CreatePost from '../components/CreatePost';
import HomePageFeed from '../components/HomePageFeed';
import ScrollToTopFab from '../components/ScrollToTopFab';
import Trending from '../components/Trending';
import { ApplicationContext } from '../context/ApplicationContext';
import { LocalStorage } from '../utils/LocalStorage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CreatePostModal from '../components/CreatePostModal';
import { PaginatedResults } from '../service/common/PaginatedResult';
import { FeedPost } from '../service/common/models/FeedPost';
import { PaginationOrder } from '../service/common/PaginationOrder';
import { PaginationQuery } from '../service/common/PaginationQuery';
import Spinner from '../atom/Spinner/Spinner';

export interface HomePageProps {
  user: IUser;
  userId: number;
}

const Home: NextPage<HomePageProps> = ({ user, userId }) => {
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const [postApi, setPostApi] = useState<PostApi | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const session = useSession();
  const appContext = useContext(ApplicationContext);
  const { setTheme } = useTheme();
  const [feed, setFeed] = useState<FeedPost[]>([]);

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

  useEffect(() => {
    if (session.status === 'authenticated') {
      setPostApi(new PostApi(session.data.jwt));
    }
  }, [session]);

  useEffect(() => {
    if (postApi === null) {
      return;
    }

    postApi.getFeedByUsername(user.username, new PaginationQuery(PaginationOrder.DESC, 1, 20)).then((response) => {
      if (response.data) {
        setFeed(response.data.data);
        setLoading(false);
        setIsFetching(false);
      }
    });
  }, [postApi, user, setFeed]);

  return (
    <>
      <Head>
        <title>Home | Vevericka</title>
      </Head>
      <header>
        <AppBar />
      </header>
      <main className="mx-auto mt-4 flex w-screen flex-col sm:w-10/12 sm:flex-row sm:justify-between md:w-7/12">
        <div className="flex w-full flex-col items-center">
          <div className="w-11/12 md:w-8/12">
            <div className="w-full rounded-md bg-white p-2 dark:bg-neutral-800">
              <CreatePost
                image={user?.image || ''}
                name={user?.name || ''}
                username={user?.username || ''}
                openModal={setIsCreatePostModalOpen}
              />
              <CreatePostModal isOpen={isCreatePostModalOpen} setIsOpen={setIsCreatePostModalOpen} />
            </div>
            {loading && (
              <div className="flex justify-center">
                <Spinner appearance="accent" spacing="medium" />
              </div>
            )}
            {!loading && (
              <HomePageFeed
                feed={feed}
                isFetching={isFetching}
                onLoadMore={async () => {
                  if (postApi === null) {
                    return;
                  }
                  setIsFetching(true);

                  const response = await postApi.getFeedByUsername(
                    user.username,
                    new PaginationQuery(PaginationOrder.DESC, currentPage + 1, 20),
                  );

                  if (response?.data?.data) {
                    setFeed((prev) => {
                      const r = response.data?.data;
                      if (!r) {
                        return prev;
                      }
                      return [...prev, ...r];
                    });
                    setCurrentPage((prev) => prev + 1);
                  }
                }}
              />
            )}
          </div>
        </div>

        {/* <div className="w-1/3 sm:w-2/3 md:w-1/3"><Trending /></div> */}

        <ScrollToTopFab />
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
    },
  };
};

export default Home;
