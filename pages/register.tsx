import { useContext } from 'react';
import type { NextPage } from 'next';
import AuthForm from '../components/AuthForm';
import AuthInputField from '../components/AuthInputField';
import AuthLayout from '../components/AuthLayout';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import AuthButton from '../components/AuthButton';
import AuthLink from '../components/AuthLink';
import { RegisterContext } from '../context/RegisterContext';
import AuthStepper from '../components/AuthStepper';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export interface RegisterPageProps {}

const Register: NextPage = () => {
  const ctx = useContext(RegisterContext);
  const { t } = useTranslation('register');

  const onShowPasswordClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    ctx.setShowPassword((prev) => !prev);
  };

  return (
    <AuthLayout pageTitle={t('pageTitle')} formTitle={t('formTitle')}>
      <AuthStepper>
        <AuthStepper.Step>
          <AuthForm>
            <AuthInputField
              label={t('form.email.label')}
              placeholder={t('form.email.placeholder')}
              type="email"
              update={ctx.setEmail}
            />

            <AuthInputField
              label={t('form.username.label')}
              placeholder={t('form.username.placeholder')}
              type="text"
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
              update={ctx.setName}
            />

            <AuthInputField
              label={t('form.password.label')}
              placeholder={t('form.password.placeholder')}
              type={ctx.showPassword ? 'text' : 'password'}
              update={ctx.setPassword}
              appendIcon={() => {
                return ctx.showPassword ? (
                  <EyeIcon className="w-5 h-5" />
                ) : (
                  <EyeOffIcon className="w-5 h-5" />
                );
              }}
              appendIconAlt={
                !ctx.showPassword
                  ? t('form.password.appendIconAltShow')
                  : t('form.password.appenIconAltHide')
              }
              appendIconClick={onShowPasswordClick}
            />

            <AuthButton
              text={t('form.button.text')}
              onClick={(e) => {
                e.preventDefault();
              }}
            />
          </AuthForm>
        </AuthStepper.Step>
      </AuthStepper>

      <div className="mt-4 flex flex-col text-gray-600 text-sm w-full items-center">
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
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps<RegisterPageProps> = async (
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
        'register',
        'auth-stepper',
      ])),
    },
  };
};

export default Register;
