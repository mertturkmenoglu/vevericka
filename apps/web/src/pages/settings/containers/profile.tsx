import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField } from '../../../components';

const profileSchema = z.object({
  firstName: z.string().min(1).max(32),
  lastName: z.string().min(1).max(32),
  imageUrl: z.string().min(1).max(256),
});

type ProfileInput = z.infer<typeof profileSchema>;

function ProfileContainer(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: 'John',
      lastName: 'Doe',
      imageUrl: 'https://github.com/mertturkmenoglu.png',
    },
  });

  return (
    <section className="mt-8 w-1/4">
      <form
        onSubmit={handleSubmit(() => {})}
        className="space-y-4"
      >
        <TextField
          label="First Name"
          error={errors.firstName}
          {...register('firstName')}
        />

        <TextField
          label="Last Name"
          error={errors.lastName}
          {...register('lastName')}
        />

        <TextField
          label="Image URL"
          error={errors.imageUrl}
          {...register('imageUrl')}
        />
      </form>
    </section>
  );
}

export default ProfileContainer;
