import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import type { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { LandingAppBar } from '@components/index';
import { Banner } from '@atom/index';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';

const LandingPage: NextPage = () => {
  const { t } = useTranslation('landing');

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

        <main className="mx-auto mt-16 max-w-3xl text-center">
          <h1
            className={clsx(
              'font-lato mx-8 mt-12 text-center text-3xl font-black leading-normal text-slate-700 dark:text-neutral-200 sm:mx-auto sm:mt-32 sm:w-2/3 sm:text-6xl'
            )}
          >
            {t('title')}
          </h1>

          <p className="font-lato mx-8 mt-16 break-words text-center text-base leading-snug text-slate-700 dark:text-neutral-200 sm:mx-auto sm:mt-32 sm:text-2xl">
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
