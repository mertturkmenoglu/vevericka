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
import { AuthApi } from '@services/index';

export interface RegisterInputs {
  email: string;
  username: string;
  name: string;
  password: string;
  betaCode: string;
}

const RegisterPage: NextPage = () => {
  const { t } = useTranslation('register');
  const [loading, setLoading] = useState(false);
  const [isServiceError, setIsServiceError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>();

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    setLoading(true);
    setIsServiceError(false);
    setErrorMessage('');

    const api = new AuthApi();

    try {
      const response = await api.register({
        ...data,
      });

      if ('isError' in response) {
        setLoading(false);
        setIsServiceError(true);
        setErrorMessage(response.message === '' ? t('genericErrorMessage') : response.message);
        return;
      }

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
    } catch (e) {
      setLoading(false);
      setIsServiceError(true);
      setErrorMessage(t('genericErrorMessage'));
      return;
    }
  };

  const onSubmitError: SubmitErrorHandler<RegisterInputs> = (err) => {
    errors.email = err.email;
    errors.betaCode = err.betaCode;
    errors.username = err.username;
    errors.name = err.name;
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
          className="mt-4 flex w-full flex-col overflow-y-auto bg-white dark:bg-neutral-800 lg:mt-4"
          onSubmit={handleSubmit(onSubmit, onSubmitError)}
        >
          <TextField
            label={t('form.email.label')}
            type="email"
            placeholder={t('form.email.placeholder')}
            {...register('email', { required: t('form.email.validation.required') })}
            error={{
              message: errors.email?.message,
              type: errors.email?.type,
            }}
          />

          <TextField
            className="mt-4"
            label={t('form.username.label')}
            type="text"
            placeholder={t('form.username.placeholder')}
            {...register('username', { required: t('form.username.validation.required') })}
            error={{
              message: errors.username?.message,
              type: errors.username?.type,
            }}
          />

          <TextField
            className="mt-4"
            label={t('form.name.label')}
            type="text"
            placeholder={t('form.name.placeholder')}
            {...register('name', { required: t('form.name.validation.required') })}
            error={{
              message: errors.name?.message,
              type: errors.name?.type,
            }}
          />

          <TextField
            className="mt-4"
            label={t('form.password.label')}
            type="password"
            placeholder={t('form.password.placeholder')}
            {...register('password', { required: t('form.password.validation.required') })}
            error={{
              message: errors.password?.message,
              type: errors.password?.type,
            }}
          />

          <TextField
            className="mt-4"
            label={t('form.betaCode.label')}
            type="text"
            placeholder={t('form.password.placeholder')}
            {...register('betaCode', { required: t('form.betaCode.validation.required') })}
            error={{
              message: errors.betaCode?.message,
              type: errors.betaCode?.type,
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

          {isServiceError && <div className="mt-4 bg-red-500 py-1 px-4 text-center text-white">{errorMessage}</div>}

          <div className="mt-8 flex w-full flex-col items-center text-sm text-gray-600">
            <AuthLink
              href="/login"
              text={t('form.links.login.text')}
              cta={t('form.links.login.cta')}
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

export default RegisterPage;
