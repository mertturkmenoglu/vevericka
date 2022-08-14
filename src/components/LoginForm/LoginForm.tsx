import React from 'react';
import { Button, TextField } from '@atom/index';
import { LockClosedIcon } from '@heroicons/react/outline';
import { AuthLink } from '@components/index';
import { useLoginForm } from './useLoginForm.hook';
import useTranslation from 'next-translate/useTranslation';

function LoginForm(): JSX.Element {
  const { t } = useTranslation('login');
  const { loading, isServiceError, errors, handleSubmit, onSubmit, register } = useLoginForm();

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

      <TextField
        className="mt-4"
        label={t('form.password.label')}
        type="password"
        autoComplete="current-password"
        placeholder={t('form.password.placeholder')}
        {...register('password', { required: t('form.password.validation.required') })}
        error={{
          message: errors.password?.message,
          type: errors.password?.type,
        }}
      />

      <Button
        text={t('form.button.text')}
        className="mt-8"
        spacing="default"
        loading={loading}
        block
        appendIcon={<LockClosedIcon className="mr-2 h-4 w-4" />}
        type="submit"
      />

      {isServiceError && <div className="mt-4 bg-red-500 py-1 px-4 text-center text-white">Cannot login</div>}

      <div className="mt-8 flex w-full flex-col items-center text-sm text-gray-600">
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
    </form>
  );
}

export default LoginForm;
