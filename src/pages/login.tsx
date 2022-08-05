import React, { useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession, signIn } from 'next-auth/react';
import type { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { AuthLayout } from '@layouts/index';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { Button, TextField } from '@atom/index';
import { LockClosedIcon } from '@heroicons/react/outline';
import { AuthLink } from '@components/index';
import { useRouter } from 'next/router';

export interface LoginInputs {
  email: string;
  password: string;
}

const LoginPage: NextPage = () => {
  const { t } = useTranslation('login');
  const [loading, setLoading] = useState(false);
  const [isServiceError, setIsServiceError] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setLoading(true);
    setIsServiceError(false);

    const result = await signIn<'credentials'>('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (!result || !result.ok) {
      setIsServiceError(true);
      setLoading(false);
      return;
    }

    setLoading(false);
    await router.push('/');
  };

  const onSubmitError: SubmitErrorHandler<LoginInputs> = (err) => {
    errors.email = err.email;
    errors.password = err.password;
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

          <TextField
            className="mt-4"
            label={t('form.password.label')}
            type="password"
            autoComplete="current-password"
            placeholder={t('form.password.placeholder')}
            {...register('password', { required: t('form.password.validation.required') })}
            error={{
              message: errors.password?.message,
              type: errors.password?.type,
            }}
          />

          <Button
            text={t('form.button.text')}
            className="mt-8"
            spacing="default"
            loading={loading}
            block
            appendIcon={<LockClosedIcon className="mr-2 h-4 w-4" />}
            type="submit"
          />

          {isServiceError && <div className="mt-4 bg-red-500 py-1 px-4 text-center text-white">Cannot login</div>}

          <div className="mt-8 flex w-full flex-col items-center text-sm text-gray-600">
            <AuthLink
              href="/register"
              text={t('form.links.register.text')}
              cta={t('form.links.register.cta')}
            />
            <AuthLink
              href="/reset"
              text={t('form.links.reset.text')}
              cta={t('form.links.reset.cta')}
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

export default LoginPage;
