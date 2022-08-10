import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

export interface ResetInputs {
  email: string;
}

export function useResetForm() {
  const { t } = useTranslation('reset');
  const [loading, setLoading] = useState(false);
  const [isServiceError, setIsServiceError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetInputs>();

  const onSubmit: SubmitHandler<ResetInputs> = async () => {
    setLoading(true);
    setIsServiceError(false);
    setErrorMessage('');

    // TODO: Implement
    setErrorMessage(t('form.genericErrorMessage'));
    setLoading(false);
    setIsServiceError(true);
  };

  return {
    loading,
    isServiceError,
    errorMessage,
    errors,
    register,
    handleSubmit,
    onSubmit,
  };
}
