// import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField } from '../../../components';

const accountSchema = z.object({
  email: z.string(),
  username: z.string(),
});

type AccountInput = z.infer<typeof accountSchema>;

function AccountContainer(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountInput>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      email: 'john@doe.com',
      username: 'johndoe',
    },
  });

  return (
    <section className="mt-8 w-1/4">
      <form
        onSubmit={handleSubmit(() => {})}
        className="space-y-4"
      >
        <TextField
          label="Email"
          disabled={true}
          error={errors.email}
          {...register('email', { disabled: true })}
        />

        <TextField
          label="Username"
          disabled={true}
          error={errors.username}
          {...register('username', { disabled: true })}
        />
      </form>
    </section>
  );
}

export default AccountContainer;
