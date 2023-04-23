import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { z } from 'zod';
import { TextField } from '../../../components';
import { useFragment } from '../../../generated';
import { MeQuery } from '../../../generated/graphql';
import { updateUserMutationDocument, UserFragment } from '../../../graphql';

const profileSchema = z.object({
  name: z.string().min(1).max(64),
  job: z.string().max(64).optional(),
  twitterHandle: z.string().max(64).optional(),
  school: z.string().max(64).optional(),
  website: z.string().max(255).optional(),
  description: z.string().max(255).optional(),
  protected: z.boolean().optional(),
  city: z.string().max(64).optional(),
  country: z.string().max(64).optional(),
  gender: z.string().max(32).optional(),
});

type ProfileInput = z.infer<typeof profileSchema>;

interface Props {
  user: MeQuery;
}

function ProfileContainer({ user }: Props): JSX.Element {
  const me = useFragment(UserFragment, user.me);
  const [updateUser] = useMutation(updateUserMutationDocument);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      city: me.city || '',
      country: me.country || '',
      description: me.description || '',
      job: me.job || '',
      name: me.name || '',
      protected: me.protected || false,
      school: me.school || '',
      twitterHandle: me.twitterHandle || '',
      website: me.website || '',
      gender: me.gender || '',
    },
  });

  return (
    <section className="mt-8 w-2/4">
      <form
        onSubmit={handleSubmit(async (values) => {
          const resp = await updateUser({
            variables: {
              payload: {
                city: values.city,
                country: values.country,
                description: values.description,
                job: values.job,
                name: values.name,
                protected: values.protected,
                school: values.school,
                twitterHandle: values.twitterHandle,
                website: values.website,
                gender: values.gender,
              },
            },
          });

          if (resp.errors) {
            toast('Error updating profile', {
              theme: 'dark',
              type: 'error',
              hideProgressBar: true,
              autoClose: 5000,
            });
          } else {
            window.location.reload();
          }
        })}
        className="flex flex-col justify-start space-y-8"
      >
        <TextField
          label="Name"
          error={errors.name}
          {...register('name')}
        />

        <TextField
          label="Job"
          placeholder='e.g. "Software Engineer"'
          error={errors.job}
          {...register('job')}
        />

        <TextField
          label="Gender"
          placeholder="You can define your gender"
          error={errors.gender}
          {...register('gender')}
        />

        <TextField
          label="Twitter Handle"
          placeholder='e.g. "johndoe"'
          error={errors.twitterHandle}
          {...register('twitterHandle')}
        />

        <TextField
          label="School"
          placeholder='e.g. "University of Waterloo"'
          error={errors.school}
          {...register('school')}
        />

        <TextField
          label="Website"
          placeholder='e.g. "https://johndoe.com"'
          error={errors.website}
          {...register('website')}
        />

        <TextField
          label="Description"
          placeholder='e.g. "I am a software engineer"'
          error={errors.description}
          {...register('description')}
        />

        <TextField
          label="City"
          placeholder='e.g. "Waterloo"'
          error={errors.city}
          {...register('city')}
        />

        <TextField
          label="Country"
          placeholder='e.g. "Canada"'
          error={errors.country}
          {...register('country')}
        />

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register('protected')}
          />
          <label htmlFor="protected-checkbox">Protect my profile</label>
        </div>

        <button
          type="submit"
          className="bg-midnight text-white"
        >
          Save
        </button>
      </form>
    </section>
  );
}

export default ProfileContainer;
