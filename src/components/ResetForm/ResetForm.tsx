import { Button, TextField } from '@atom/index';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { AuthLink } from '..';
import { useResetForm } from './useResetForm.hook';

function ResetForm(): JSX.Element {
  const { t } = useTranslation('reset');
  const { loading, isServiceError, errorMessage, errors, handleSubmit, onSubmit, register } = useResetForm();

  return (
    <form
      className="mt-4 flex w-full flex-col bg-white dark:bg-neutral-800 lg:mt-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        label={t('form.email.label')}
        type="email"
        autoComplete="username"
        placeholder={t('form.email.placeholder')}
        {...register('email', { required: t('form.email.validation.required') })}
        error={{
          message: errors.email?.message,
          type: errors.email?.type,
        }}
      />

      <Button
        text={t('form.button.text')}
        className="mt-8"
        spacing="default"
        loading={loading}
        block
        prependIcon={<ArrowRightIcon className="ml-2 h-4 w-4" />}
        type="submit"
      />

      {isServiceError && <div className="mt-4 bg-red-500 py-1 px-4 text-center text-white">{errorMessage}</div>}

      <div className="mt-8 flex w-full flex-col items-center text-sm text-gray-600">
        <AuthLink
          href="/login"
          text={t('form.links.login.text')}
          cta={t('form.links.login.cta')}
        />
        <AuthLink
          href="/register"
          text={t('form.links.register.text')}
          cta={t('form.links.register.cta')}
        />
      </div>
    </form>
  );
}

export default ResetForm;
