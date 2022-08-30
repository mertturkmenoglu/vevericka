import { Button, TextField } from '@atom/index';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { AuthLink } from '..';
import { useRegisterForm } from './useRegisterForm.hook';

function RegisterForm(): JSX.Element {
  const { t } = useTranslation('register');
  const { loading, isServiceError, errors, errorMessage, handleSubmit, onSubmit, register } = useRegisterForm();

  return (
    <form
      className="mt-4 flex w-full flex-col overflow-y-auto bg-white dark:bg-neutral-800 lg:mt-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        label={t('form.email.label')}
        type="email"
        placeholder={t('form.email.placeholder')}
        {...register('email', { required: t('form.email.validation.required') })}
        error={{
          message: errors.email?.message,
          type: errors.email?.type,
        }}
      />

      <TextField
        className="mt-4"
        label={t('form.username.label')}
        type="text"
        placeholder={t('form.username.placeholder')}
        {...register('username', { required: t('form.username.validation.required') })}
        error={{
          message: errors.username?.message,
          type: errors.username?.type,
        }}
      />

      <TextField
        className="mt-4"
        label={t('form.name.label')}
        type="text"
        placeholder={t('form.name.placeholder')}
        {...register('name', { required: t('form.name.validation.required') })}
        error={{
          message: errors.name?.message,
          type: errors.name?.type,
        }}
      />

      <TextField
        className="mt-4"
        label={t('form.password.label')}
        type="password"
        placeholder={t('form.password.placeholder')}
        {...register('password', { required: t('form.password.validation.required') })}
        error={{
          message: errors.password?.message,
          type: errors.password?.type,
        }}
      />

      <TextField
        className="mt-4"
        label={t('form.betaCode.label')}
        type="text"
        placeholder={t('form.betaCode.placeholder')}
        {...register('betaCode', { required: t('form.betaCode.validation.required') })}
        error={{
          message: errors.betaCode?.message,
          type: errors.betaCode?.type,
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

      {isServiceError && <div className="mt-4 bg-red-500 py-1 px-4 text-center text-white">{errorMessage}</div>}

      <div className="mt-8 flex w-full flex-col items-center text-sm text-gray-600">
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
    </form>
  );
}

export default RegisterForm;
