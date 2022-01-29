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

export interface LoginPageProps {}

const Login: NextPage = () => {
  const ctx = useContext(LoginContext);
  const router = useRouter();

  const onShowPasswordClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    ctx.setShowPassword((prev) => !prev);
  };

  return (
    <AuthLayout pageTitle="Login | Vevericka" formTitle="Login">
      <AuthForm>
        <AuthInputField
          label="Email"
          placeholder="Email"
          type="email"
          update={ctx.setEmail}
        />

        <AuthInputField
          label="Password"
          placeholder="Password"
          type={ctx.showPassword ? 'text' : 'password'}
          update={ctx.setPassword}
          appendIcon={() => {
            return ctx.showPassword ? (
              <EyeIcon className="w-5 h-5" />
            ) : (
              <EyeOffIcon className="w-5 h-5" />
            );
          }}
          appendIconAlt="Show password"
          appendIconClick={onShowPasswordClick}
        />

        <AuthButton
          text="Login"
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
          <AuthLink href="/register" text="New user?" cta="Register" />
          <AuthLink href="/reset" text="Forgot password?" cta="Reset" />
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
    props: {},
  };
};

export default Login;
