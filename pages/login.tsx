import { useContext } from 'react';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import AuthLayout from '../components/AuthLayout';
import AuthLink from '../components/AuthLink';
import AuthButton from '../components/AuthButton';
import AuthInputField from '../components/AuthInputField';
import AuthForm from '../components/AuthForm';
import { LoginContext } from '../context/LoginContext';
import { useRouter } from 'next/router';
import { getSession, signIn } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export interface LoginPageProps {}

const Login: NextPage = () => {
  const ctx = useContext(LoginContext);
  const router = useRouter();

  const { t } = useTranslation('login');

  const onShowPasswordClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    ctx.setShowPassword((prev) => !prev);
  };

  return (
    <AuthLayout pageTitle={t('pageTitle')} formTitle={t('formTitle')}>
      <AuthForm>
        <AuthInputField
          label={t('form.email.label')}
          placeholder={t('form.email.placeholder')}
          type="email"
          update={ctx.setEmail}
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
              : t('form.password.appendIconAltHide')
          }
          appendIconClick={onShowPasswordClick}
        />

        <AuthButton
          text={t('form.button.text')}
          onClick={async (e) => {
            e.preventDefault();
            try {
              await signIn('credentials', {
                redirect: false,
                email: ctx.email,
                password: ctx.password,
              });
              await router.push('/feed');
            } catch (e) {}
          }}
        />

        <div className="mt-4 flex flex-col text-gray-600 text-sm w-full items-center">
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
