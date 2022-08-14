import { AuthApi } from '@services/auth';
import { signIn } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export interface RegisterInputs {
  email: string;
  username: string;
  name: string;
  password: string;
  betaCode: string;
}

export function useRegisterForm() {
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

  return {
    loading,
    isServiceError,
    errorMessage,
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
}
