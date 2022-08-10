import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export interface LoginInputs {
  email: string;
  password: string;
}

export function useLoginForm() {
  const [loading, setLoading] = useState(false);
  const [isServiceError, setIsServiceError] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setLoading(true);
    setIsServiceError(false);

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
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    loading,
    isServiceError,
  };
}
