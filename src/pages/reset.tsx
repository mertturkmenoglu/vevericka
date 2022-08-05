import React, { useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import type { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { AuthLayout } from '@layouts/index';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { Button, TextField } from '@atom/index';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { AuthLink } from '@components/index';

export interface ResetInputs {
  email: string;
}

const ResetPage: NextPage = () => {
  const { t } = useTranslation('reset');
  const [loading, setLoading] = useState(false);
  const [isServiceError, setIsServiceError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetInputs>();

  const onSubmit: SubmitHandler<ResetInputs> = async () => {
    setLoading(true);
    setIsServiceError(false);
    setErrorMessage('');

    // TODO: Implement
    setErrorMessage(t('form.genericErrorMessage'));
    setLoading(false);
    setIsServiceError(true);
  };

  const onSubmitError: SubmitErrorHandler<ResetInputs> = (err) => {
    errors.email = err.email;
  };

  return (
    <>
      <Head>
        <title>{t('pageTitle')}</title>
      </Head>

      <AuthLayout
        pageTitle={t('pageTitle')}
        formTitle={t('formTitle')}
      >
        <form
          className="mt-4 flex w-full flex-col bg-white dark:bg-neutral-800 lg:mt-4"
          onSubmit={handleSubmit(onSubmit, onSubmitError)}
        >
          <TextField
            label={t('form.email.label')}
            type="email"
            autoComplete="username"
            placeholder={t('form.email.placeholder')}
            {...register('email', { required: t('form.email.validation.required') })}
            error={{
              message: errors.email?.message,
              type: errors.email?.type,
            }}
          />

          <Button
            text={t('form.button.text')}
            className="mt-8"
            spacing="default"
            loading={loading}
            block
            prependIcon={<ArrowRightIcon className="ml-2 h-4 w-4" />}
            type="submit"
          />

          {isServiceError && <div className="mt-4 bg-red-500 py-1 px-4 text-center text-white">{errorMessage}</div>}

          <div className="mt-8 flex w-full flex-col items-center text-sm text-gray-600">
            <AuthLink
              href="/login"
              text={t('form.links.login.text')}
              cta={t('form.links.login.cta')}
            />
            <AuthLink
              href="/register"
              text={t('form.links.register.text')}
              cta={t('form.links.register.cta')}
            />
          </div>
        </form>
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
