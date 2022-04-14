import { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { EyeIcon, EyeOffIcon, LockClosedIcon } from '@heroicons/react/outline';
import { GetServerSideProps } from 'next';

import { getSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Cookies from 'universal-cookie';

import { LoginContext } from '@context/LoginContext';
import AuthLayout from '@layouts/AuthLayout';
import AuthForm from '@components/AuthForm';
import AuthLink from '@components/AuthLink';
import Button from '@atom/Button/Button';
import TextField from '@atom/TextField/TextField';
import type { NextPage } from 'next';

export interface LoginPageProps {}

const Login: NextPage = () => {
  const ctx = useContext(LoginContext);
  const { t } = useTranslation('login');
  const captchaRef = useRef<HCaptcha | null>(null);

  const onShowPasswordClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    ctx.setShowPassword((prev) => !prev);
  };

  const loginAction = useCallback(async () => {
    await ctx.login(t);
    if (!ctx.loading && ctx.error !== null) {
      captchaRef.current?.resetCaptcha();
    }
  }, [ctx]);

  const showError = useMemo(() => {
    return ctx.error !== null;
  }, [ctx]);

  useEffect(() => {
    if (ctx.captchaToken) {
      loginAction().then(() => {
        captchaRef.current?.resetCaptcha();
      });
    }
  }, [ctx.captchaToken]);

  return (
    <AuthLayout pageTitle={t('pageTitle')} formTitle={t('formTitle')}>
      <AuthForm>
        <TextField
          label={t('form.email.label')}
          type="email"
          name="email"
          appearance="primary"
          autoComplete="username"
          value={ctx.email}
          setValue={ctx.setEmail}
        />

        <TextField
          label={t('form.password.label')}
          type={ctx.showPassword ? 'text' : 'password'}
          appearance="primary"
          name="password"
          value={ctx.password}
          setValue={ctx.setPassword}
          autoComplete="current-password"
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
            if (ctx.email !== '' && ctx.password !== '') {
              captchaRef.current?.execute();
            }
          }}
        />

        <HCaptcha
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ''}
          ref={captchaRef}
          onVerify={(token) => ctx.setCaptchaToken(token)}
          languageOverride={new Cookies().get('NEXT_LOCALE') || 'en'}
          size="invisible"
        />

        {showError && <div className="mt-4 bg-red-500 py-1 px-4 text-center text-white">{ctx.error}</div>}

        <div className="mt-4 flex w-full flex-col items-center text-sm text-gray-600">
          <AuthLink href="/register" text={t('form.links.register.text')} cta={t('form.links.register.cta')} />
          <AuthLink href="/reset" text={t('form.links.reset.text')} cta={t('form.links.reset.cta')} />
        </div>

        <div className="mt-8 text-center text-sm text-midnight dark:text-gray-400">
          This site is protected by{' '}
          <a href="https://www.hCaptcha.com" className="text-primary">
            hCaptcha
          </a>{' '}
          and its{' '}
          <a href="https://www.hcaptcha.com/privacy" className="text-primary">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="https://www.hcaptcha.com/terms" className="text-primary">
            Terms of Service
          </a>{' '}
          apply.
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
