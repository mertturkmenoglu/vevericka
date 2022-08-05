import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession, signOut } from 'next-auth/react';
import type { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

const FeedPage: NextPage = () => {
  const { t } = useTranslation('landing');
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Vevericka</title>
      </Head>
      Home {t('a')}
      <button
        onClick={async () => {
          await signOut();
          await router.push('/');
        }}
      >
        logout
      </button>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default FeedPage;
