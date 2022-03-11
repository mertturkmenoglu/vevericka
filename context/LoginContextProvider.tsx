import { signIn } from 'next-auth/react';
import { TFunction } from 'next-i18next';
import router from 'next/router';
import { useMemo, useState } from 'react';
import {
  defaultLoginContextState as defaultValues,
  LoginContext,
} from './LoginContext';
import isEmail from 'validator/lib/isEmail';

export interface LoginContextProviderProps {}

const LoginContextProvider: React.FC<LoginContextProviderProps> = ({
  children,
}) => {
  const [email, setEmail] = useState(defaultValues.email);
  const [password, setPassword] = useState(defaultValues.password);
  const [showPassword, setShowPassword] = useState(defaultValues.showPassword);
  const [error, setError] = useState(defaultValues.error);
  const [loading, setLoading] = useState(defaultValues.loading);
  const [captchaToken, setCaptchaToken] = useState(defaultValues.captchaToken);

  const isEmailValid = useMemo(() => {
    return isEmail(email);
  }, [email]);

  const login = async (t: TFunction) => {
    setLoading(true);
    setError(null);

    try {
      const result = await signIn<'credentials'>('credentials', {
        redirect: false,
        email: email,
        password: password,
      });

      if (!result) {
        setError(t('error.genericSignInError'));
        setLoading(false);
        return;
      }

      if (!result.ok) {
        setError(t('error.invalidEmailOrPassword'));
        setLoading(false);
        return;
      }

      setError(null);
      setLoading(false);
      await router.push('/feed');
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContext.Provider
      value={{
        email,
        setEmail,
        isEmailValid,
        password,
        error,
        loading,
        setPassword,
        showPassword,
        setShowPassword,
        setError,
        setLoading,
        captchaToken,
        setCaptchaToken,
        login,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
