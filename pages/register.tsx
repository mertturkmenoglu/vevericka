import { useContext, useMemo } from 'react';
import router from 'next/router';
import { EyeIcon, EyeOffIcon, RefreshIcon } from '@heroicons/react/outline';
import { GetServerSideProps } from 'next';

import { getSession, signIn } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { RegisterContext } from '@context/RegisterContext';
import AuthLayout from '@layouts/AuthLayout';
import AuthButton from '@components/AuthButton';
import AuthForm from '@components/AuthForm';
import AuthInputField from '@components/AuthInputField';
import AuthLink from '@components/AuthLink';
import AuthStepper from '@components/AuthStepper';
import type { NextPage } from 'next';

export interface RegisterPageProps {}

const Register: NextPage = () => {
  const ctx = useContext(RegisterContext);
  const { t } = useTranslation('register');

  const onShowPasswordClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    ctx.setShowPassword((prev) => !prev);
  };

  const showError = useMemo(() => {
    return ctx.error !== null;
  }, [ctx]);

  return (
    <AuthLayout pageTitle={t('pageTitle')} formTitle={t('formTitle')}>
      <AuthStepper>
        <AuthStepper.Step>
          <AuthForm>
            <AuthInputField
              label={t('form.email.label')}
              placeholder={t('form.email.placeholder')}
              type="email"
              value={ctx.email}
              update={ctx.setEmail}
            />

            <AuthInputField
              label={t('form.username.label')}
              placeholder={t('form.username.placeholder')}
              type="text"
              value={ctx.username}
              update={ctx.setUsername}
            />
          </AuthForm>
        </AuthStepper.Step>

        <AuthStepper.Step>
          <AuthForm>
            <AuthInputField
              label={t('form.name.label')}
              placeholder={t('form.name.placeholder')}
              type="text"
              value={ctx.name}
              update={ctx.setName}
            />

            <AuthInputField
              label={t('form.password.label')}
              placeholder={t('form.password.placeholder')}
              type={ctx.showPassword ? 'text' : 'password'}
              update={ctx.setPassword}
              value={ctx.password}
              appendIcon={() => {
                return ctx.showPassword ? <EyeIcon className="h-5 w-5" /> : <EyeOffIcon className="h-5 w-5" />;
              }}
              appendIconAlt={
                !ctx.showPassword ? t('form.password.appendIconAltShow') : t('form.password.appendIconAltHide')
              }
              appendIconClick={onShowPasswordClick}
            />

            <AuthInputField
              label={t('form.betaCode.label')}
              placeholder={t('form.betaCode.placeholder')}
              type="text"
              value={ctx.betaCode}
              update={ctx.setBetaCode}
            />

            {showError && <div className="mt-4 bg-red-500 py-1 px-4 text-center text-white">{ctx.error}</div>}

            {ctx.loading && (
              <div className="mx-auto mt-8 flex items-center justify-center">
                <RefreshIcon className="h-6 w-6 animate-spin text-primary" />
              </div>
            )}

            <AuthButton
              text={t('form.button.text')}
              onClick={async (e) => {
                e.preventDefault();
                const res = await ctx.register();

                if (res) {
                  const result = await signIn<'credentials'>('credentials', {
                    redirect: false,
                    email: ctx.email,
                    password: ctx.password,
                  });

                  if (result && result.ok) {
                    ctx.setLoading(false);
                    ctx.setError(null);
                    await router.push('/feed');
                  }
                }
              }}
            />
          </AuthForm>
        </AuthStepper.Step>
      </AuthStepper>

      <div className="mt-4 flex w-full flex-col items-center text-sm text-gray-600">
        <AuthLink href="/login" text={t('form.links.login.text')} cta={t('form.links.login.cta')} />
        <AuthLink href="/reset" text={t('form.links.reset.text')} cta={t('form.links.reset.cta')} />
      </div>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps<RegisterPageProps> = async (context) => {
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
      ...(await serverSideTranslations(context.locale || 'en', ['auth', 'register', 'auth-stepper'])),
    },
  };
};

export default Register;
