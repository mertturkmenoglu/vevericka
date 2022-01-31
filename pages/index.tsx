import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import LandingAppBar from '../components/LandingAppBar';
import { ApplicationContext } from '../context/ApplicationContext';
import { LocalStorage } from '../utils/LocalStorage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export interface LandingPageProps {}

const LandingPage: NextPage<LandingPageProps> = () => {
  const appContext = useContext(ApplicationContext);
  const { setTheme } = useTheme();
  const { t } = useTranslation('landing');

  useEffect(() => {
    const storage = new LocalStorage();
    appContext.setIsDarkTheme(storage.isDarkTheme);
    setTheme(storage.isDarkTheme ? 'dark' : 'light');
    document.querySelector('body')?.classList?.add('bg-gray-50');
  });

  return (
    <>
      <Head>
        <title>Vevericka</title>
      </Head>
      <header className="mt-8 w-11/12 sm:w-2/3 md:w-1/2 mx-auto py-4 px-8 rounded-full bg-white">
        <LandingAppBar />
      </header>
      <main className="w-11/12 sm:w-2/3 md:w-1/2 mx-auto flex flex-col items-center">
        <h1 className="mx-auto sm:w-2/3 text-center text-slate-700 text-3xl sm:text-6xl font-lato mt-12 sm:mt-48 font-black leading-normal ">
          {t('title')}
        </h1>
        <p className="text-center w-full mx-auto mt-16 sm:mt-32 text-base sm:text-2xl leading-snug font-lato text-slate-700">
          {t('content')}
        </p>
        <Link href="/login">
          <a className="mx-auto bg-midnight mt-16 rounded-md px-8 py-2 sm:px-16 sm:py-4 flex items-center transform hover:scale-105 ease-in-out transition-all duration-300">
            <Image
              src="/assets/nut_white.svg"
              width={32}
              height={32}
              alt="Nut"
              className="pt-2"
            />
            <span className="font-lato text-lg font-medium ml-4 text-white">
              {t('cta')}
            </span>
          </a>
        </Link>
      </main>
      <footer></footer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<LandingPageProps> = async (
  context
) => {
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
