import { useContext, useMemo } from 'react';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { EyeIcon, EyeOffIcon, LockClosedIcon } from '@heroicons/react/outline';
import AuthLayout from '../components/AuthLayout';
import AuthLink from '../components/AuthLink';
import AuthForm from '../components/AuthForm';
import { LoginContext } from '../context/LoginContext';
import { getSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Button from '../atom/Button/Button';
import TextField from '../atom/TextField/TextField';

export interface LoginPageProps {}

const Login: NextPage = () => {
  const ctx = useContext(LoginContext);
  const { t } = useTranslation('login');

  const onShowPasswordClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    ctx.setShowPassword((prev) => !prev);
  };

  const loginAction = async () => {
    await ctx.login(t);
  };

  const showError = useMemo(() => {
    return ctx.error !== null;
  }, [ctx]);

  return (
    <AuthLayout pageTitle={t('pageTitle')} formTitle={t('formTitle')}>
      <AuthForm>
        <TextField
          label={t('form.email.label')}
          type="email"
          appearance="primary"
          value={ctx.email}
          setValue={ctx.setEmail}
        />

        <TextField
          label={t('form.password.label')}
          type={ctx.showPassword ? 'text' : 'password'}
          appearance="primary"
          value={ctx.password}
          setValue={ctx.setPassword}
          appendIcon={
            ctx.showPassword ? (
              <EyeIcon className="h-5 w-5 text-midnight dark:text-gray-400" />
            ) : (
              <EyeOffIcon className="h-5 w-5 text-midnight dark:text-gray-400" />
            )
          }
          onAppendIconClick={(e) => {
            e.preventDefault();
            onShowPasswordClick(e);
          }}
        />

        <Button
          text={t('form.button.text')}
          className="mt-4"
          appearance="primary"
          spacing="default"
          loading={ctx.loading}
          block
          appendIcon={<LockClosedIcon className="mr-2 h-4 w-4" />}
          onClick={async (e) => {
            e.preventDefault();
            await loginAction();
          }}
        />

        {showError && <div className="mt-4 bg-red-500 py-1 px-4 text-center text-white">{ctx.error}</div>}

        <div className="mt-4 flex w-full flex-col items-center text-sm text-gray-600">
          <AuthLink href="/register" text={t('form.links.register.text')} cta={t('form.links.register.cta')} />
          <AuthLink href="/reset" text={t('form.links.reset.text')} cta={t('form.links.reset.cta')} />
        </div>
      </AuthForm>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps<LoginPageProps> = async (context) => {
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
      ...(await serverSideTranslations(context.locale || 'en', ['auth', 'login'])),
    },
  };
};

export default Login;
