import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TextField, Button } from '@atom/index';
import { SearchIcon } from '@heroicons/react/outline';

export interface SearchInputs {
  searchTerm: string;
}

function SearchSection(): JSX.Element {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SearchInputs>();

  const onSubmit: SubmitHandler<SearchInputs> = (data) => {
    console.log(data);
  };

  return (
    <section className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label={'Search'}
          type="search"
          className="w-full"
          placeholder={'Search anything: User, post, hashtag'}
          {...register('searchTerm', { required: 'form.email.validation.required' })}
          error={{
            message: errors.searchTerm?.message,
            type: errors.searchTerm?.type,
          }}
        />
        <Button
          text={'Search'}
          className="mx-auto mt-8 rounded-full py-3.5 px-12 dark:bg-primary"
          spacing="large"
          loading={false}
          prependIcon={<SearchIcon className="ml-4 h-6 w-6" />}
          type="submit"
        />
      </form>
    </section>
  );
}

export default SearchSection;
