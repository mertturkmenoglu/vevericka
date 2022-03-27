import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { useContext, useEffect } from 'react';
import LandingAppBar from '../components/LandingAppBar';
import { ApplicationContext } from '../context/ApplicationContext';
import { LocalStorage } from '../utils/LocalStorage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Seo from '../components/Seo';
import Banner from '../atom/Banner';

export interface LandingPageProps {}

const LandingPage: NextPage<LandingPageProps> = () => {
  const BODY_CLASSNAME = 'bg-gray-50';

  const appContext = useContext(ApplicationContext);
  const { setTheme } = useTheme();
  const { t } = useTranslation('landing');
  const router = useRouter();

  useEffect(() => {
    const storage = new LocalStorage();
    appContext.setIsDarkTheme(storage.isDarkTheme);
    setTheme(storage.isDarkTheme ? 'dark' : 'light');
    document.querySelector('body')?.classList?.add(BODY_CLASSNAME);
  });

  const beforeRouteLeave = () => {
    document.querySelector('body')?.classList?.remove(BODY_CLASSNAME);
  };

  return (
    <>
      <Head>
        <title>Vevericka</title>
        <Seo
          title="Vevericka"
          description={t('title')}
          og={{
            siteName: 'Vevericka',
            title: 'Vevericka',
            description: t('title'),
            image: 'https://imagedelivery.net/JVFt9XOk2_QXFDv2enrWOQ/c870d0f4-35a8-4ec9-c570-9c8082421700/public',
            url: 'https://vevericka.app',
            type: 'website',
            locale: router.locale || 'en',
          }}
          twitter={{
            card: 'summary',
            title: 'Vevericka',
            description: t('title'),
            image: 'https://imagedelivery.net/JVFt9XOk2_QXFDv2enrWOQ/c870d0f4-35a8-4ec9-c570-9c8082421700/public',
            imageAlt: t('meta.twitter.imageAlt'),
            creator: '@capreaee',
          }}
        />
        <meta
          name="twitter:image"
          content="https://imagedelivery.net/JVFt9XOk2_QXFDv2enrWOQ/c870d0f4-35a8-4ec9-c570-9c8082421700/public"
        />
      </Head>
      <div className="mx-auto">
        <Banner appearance="primary">
          <div className="flex items-center truncate text-ellipsis">
            <span className="ml-2 text-white">{t('banner.text')}</span>
          </div>
        </Banner>
      </div>
      <header className="mx-auto mt-8 w-11/12 rounded-full bg-white py-4 px-8 dark:bg-neutral-800 sm:w-2/3 md:w-1/2">
        <LandingAppBar />
      </header>
      <main className="mx-auto flex w-11/12 flex-col items-center sm:w-2/3 md:w-1/2">
        <h1 className="font-lato mx-auto mt-12 text-center text-3xl font-black leading-normal text-slate-700 dark:text-neutral-200 sm:mt-48 sm:w-2/3 sm:text-6xl">
          {t('title')}
        </h1>
        <p className="font-lato mx-auto mt-16 w-full text-center text-base leading-snug text-slate-700 dark:text-neutral-200 sm:mt-32 sm:text-2xl">
          {t('content')}
        </p>
        <Link href="/login">
          <a
            className="mx-auto mt-16 flex transform items-center rounded-md bg-midnight px-8 py-2 transition-all duration-300 ease-in-out hover:scale-105 dark:border dark:border-primary sm:px-16 sm:py-4"
            onClick={beforeRouteLeave}
          >
            <Image src="/assets/nut_white.svg" width={32} height={32} alt="Nut" className="pt-2" />
            <span className="font-lato ml-4 text-lg font-medium text-white">{t('cta')}</span>
          </a>
        </Link>
      </main>
      <footer></footer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<LandingPageProps> = async (context) => {
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
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['landing'])),
    },
  };
};

export default LandingPage;
