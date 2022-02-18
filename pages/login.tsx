import { useContext, useMemo } from 'react';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { EyeIcon, EyeOffIcon, RefreshIcon } from '@heroicons/react/outline';
import AuthLayout from '../components/AuthLayout';
import AuthLink from '../components/AuthLink';
import AuthButton from '../components/AuthButton';
import AuthInputField from '../components/AuthInputField';
import AuthForm from '../components/AuthForm';
import { LoginContext } from '../context/LoginContext';
import { getSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export interface LoginPageProps {}

const Login: NextPage = () => {
  const ctx = useContext(LoginContext);
  const { t } = useTranslation('login');

  const onShowPasswordClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
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
        <AuthInputField
          label={t('form.email.label')}
          placeholder={t('form.email.placeholder')}
          type="email"
          value={ctx.email}
          update={ctx.setEmail}
        />

        <AuthInputField
          label={t('form.password.label')}
          placeholder={t('form.password.placeholder')}
          type={ctx.showPassword ? 'text' : 'password'}
          update={ctx.setPassword}
          value={ctx.password}
          appendIcon={() => {
            return ctx.showPassword ? (
              <EyeIcon className="h-5 w-5" />
            ) : (
              <EyeOffIcon className="h-5 w-5" />
            );
          }}
          appendIconAlt={
            !ctx.showPassword
              ? t('form.password.appendIconAltShow')
              : t('form.password.appendIconAltHide')
          }
          appendIconClick={onShowPasswordClick}
          onEnterPressed={() => loginAction()}
        />

        {showError && (
          <div className="mt-4 bg-red-500 py-1 px-4 text-center text-white">
            {ctx.error}
          </div>
        )}

        {ctx.loading && (
          <div className="mx-auto mt-8 flex items-center justify-center">
            <RefreshIcon className="h-6 w-6 animate-spin text-primary" />
          </div>
        )}

        <AuthButton
          text={t('form.button.text')}
          onClick={async (e) => {
            e.preventDefault();
            await loginAction();
          }}
        />

        <div className="mt-4 flex w-full flex-col items-center text-sm text-gray-600">
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
      </AuthForm>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps<LoginPageProps> = async (
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
      ...(await serverSideTranslations(context.locale || 'en', [
        'auth',
        'login',
      ])),
    },
  };
};

export default Login;
