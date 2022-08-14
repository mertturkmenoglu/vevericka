import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import type { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { AuthLayout } from '@layouts/index';
import { RegisterForm } from '@components/RegisterForm';

const RegisterPage: NextPage = () => {
  const { t } = useTranslation('register');

  return (
    <>
      <Head>
        <title>{t('pageTitle')}</title>
      </Head>

      <AuthLayout
        pageTitle={t('pageTitle')}
        formTitle={t('formTitle')}
      >
        <RegisterForm />
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

export default RegisterPage;
