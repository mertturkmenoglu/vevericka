import * as React from 'react';
import { useEffect } from 'react';
import Head from 'next/head';

import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTheme } from 'next-themes';
import type { NextPage } from 'next';

const LandingPage: NextPage = () => {
  const { setTheme } = useTheme();
  const { t } = useTranslation('landing');
  const router = useRouter();

  useEffect(() => {
    const storage = new LocalStorage();
    appContext.setIsDarkTheme(storage.isDarkTheme);
    setTheme(storage.isDarkTheme ? 'dark' : 'light');
    document.querySelector('body')?.classList?.add(BODY_CLASSNAME);
  });

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
      
      <footer></footer>
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
