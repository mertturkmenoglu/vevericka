import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import type { NextPage } from 'next';
import { AuthLayout } from '@layouts/index';
import { ResetForm } from '@components/index';
import useTranslation from 'next-translate/useTranslation';

const ResetPage: NextPage = () => {
  const { t } = useTranslation('reset');

  return (
    <>
      <Head>
        <title>{t('pageTitle')}</title>
      </Head>

      <AuthLayout
        pageTitle={t('pageTitle')}
        formTitle={t('formTitle')}
      >
        <ResetForm />
      </AuthLayout>
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

export default ResetPage;
