import React, { useRef } from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';
import { LandingAppBar } from '@components/index';
import { Banner } from '@atom/index';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation } from 'swiper';
import { useQuery } from 'react-query';
import { BlogApi } from '@services/blog';
import LoadingLayout from '@layouts/LoadingLayout';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const LandingPage: NextPage = () => {
  const { t } = useTranslation('landing');
  const blogApi = useRef(new BlogApi());
  const {
    data: playlists,
    isLoading,
    isError,
  } = useQuery(['landingPlaylists'], async () => {
    return blogApi.current.getAllPlaylists();
  });

  return (
    <>
      <Head>
        <title>Vevericka</title>
      </Head>

      <Banner appearance="primary">
        <div className="flex items-center truncate text-ellipsis">
          <span className="ml-2 text-white">{t('banner.text')}</span>
        </div>
      </Banner>

      <div className="mx-auto max-w-5xl">
        <header>
          <LandingAppBar className="mt-8" />
        </header>

        <main className="mx-auto mt-16 max-w-5xl text-center">
          <h1
            className={clsx(
              'font-lato mx-8 mt-12 text-center text-3xl font-black leading-normal text-slate-700 dark:text-neutral-200 sm:mx-auto sm:mt-32 sm:w-2/3 sm:text-4xl'
            )}
          >
            {t('title')}
          </h1>

          <p className="font-lato mx-8 mt-16 max-w-3xl break-words text-center text-base leading-snug text-slate-700 dark:text-neutral-200 sm:mx-auto sm:text-xl">
            {t('content')}
          </p>

          <Link href="/login">
            <a
              className={clsx(
                'mx-auto mt-16 w-64 text-center',
                'flex items-center justify-center',
                'transform transition-all duration-300 ease-in-out hover:scale-105',
                'rounded-md bg-midnight px-8 py-2  dark:border dark:border-primary sm:px-16 sm:py-4'
              )}
            >
              <Image
                src="/assets/nut_white.svg"
                width={32}
                height={32}
                alt="Nut"
                className="pt-2"
              />
              <span className="font-lato ml-4 text-lg font-medium text-white">{t('cta')}</span>
            </a>
          </Link>

          <div className="font-lato mt-16 w-full text-center text-3xl font-black text-slate-700">
            <h2>Latest posts from our blog</h2>
            <LoadingLayout
              isLoading={isLoading}
              isError={isError}
            >
              <div className="flex items-center">
                <button className="swiper-button-prev-unique">
                  <ChevronLeftIcon className="h-6 w-6 text-midnight" />
                  <span className="sr-only">Previous</span>
                </button>
                <Swiper
                  className="mt-8 flex items-center"
                  slidesPerView={3}
                  spaceBetween={80}
                  modules={[A11y, Navigation]}
                  loopFillGroupWithBlank={false}
                  loop={true}
                  navigation={{
                    enabled: true,
                    prevEl: '.swiper-button-prev-unique',
                    nextEl: '.swiper-button-next-unique',
                  }}
                >
                  {(playlists ?? []).map((playlist) => (
                    <SwiperSlide
                      key={playlist.title}
                      className="flex items-center"
                    >
                      <a
                        href={`/blog/playlist/${playlist.startsAt.split('-')[0]}/${playlist.startsAt.split('-')[1]}`}
                        className="flex min-h-[288px] flex-col items-center rounded-xl bg-paper-50 p-4 text-center"
                      >
                        <Image
                          src={'http:' + playlist.thumbnail.fields.file.url}
                          width={192}
                          height={192}
                          alt={playlist.thumbnail.fields.description}
                        />
                        <p className="mt-4 text-sm">{playlist.title}</p>
                      </a>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <button className="swiper-button-next-unique">
                  <ChevronRightIcon className="h-6 w-6 text-midnight" />
                  <span className="sr-only">Next</span>
                </button>
              </div>
            </LoadingLayout>
          </div>
        </main>

        <footer></footer>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/feed',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default LandingPage;
