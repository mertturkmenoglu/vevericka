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
import { useRouter } from 'next/router';
import Seo from '../components/Seo';

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
            image:
              'https://imagedelivery.net/JVFt9XOk2_QXFDv2enrWOQ/c870d0f4-35a8-4ec9-c570-9c8082421700/public',
            url: 'https://vevericka.app',
            type: 'website',
            locale: router.locale || 'en',
          }}
          twitter={{
            card: 'summary',
            title: 'Vevericka',
            description: t('title'),
            image:
              'https://imagedelivery.net/JVFt9XOk2_QXFDv2enrWOQ/c870d0f4-35a8-4ec9-c570-9c8082421700/public',
            imageAlt: t('meta.twitter.imageAlt'),
            creator: '@capreaee',
          }}
        />
        <meta name="twitter:image" content='https://imagedelivery.net/JVFt9XOk2_QXFDv2enrWOQ/c870d0f4-35a8-4ec9-c570-9c8082421700/public' />
      </Head>
      <header className="mt-8 w-11/12 sm:w-2/3 md:w-1/2 mx-auto py-4 px-8 rounded-full bg-white dark:bg-neutral-800">
        <LandingAppBar />
      </header>
      <main className="w-11/12 sm:w-2/3 md:w-1/2 mx-auto flex flex-col items-center">
        <h1 className="mx-auto sm:w-2/3 text-center text-slate-700 text-3xl sm:text-6xl font-lato mt-12 sm:mt-48 font-black leading-normal dark:text-neutral-200">
          {t('title')}
        </h1>
        <p className="text-center w-full mx-auto mt-16 sm:mt-32 text-base sm:text-2xl leading-snug font-lato text-slate-700 dark:text-neutral-200">
          {t('content')}
        </p>
        <Link href="/login">
          <a
            className="mx-auto bg-midnight mt-16 rounded-md px-8 py-2 sm:px-16 sm:py-4 flex items-center transform hover:scale-105 ease-in-out transition-all duration-300 dark:border dark:border-primary"
            onClick={beforeRouteLeave}
          >
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
