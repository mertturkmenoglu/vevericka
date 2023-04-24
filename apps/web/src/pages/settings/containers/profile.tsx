import 'react-toastify/dist/ReactToastify.css';
import { TextField } from '../../../components';
import { MeQuery } from '../../../generated/graphql';
import { useProfile } from '../hooks/useProfile';

interface Props {
  user: MeQuery;
}

function ProfileContainer({ user }: Props): JSX.Element {
  const { handleSubmit, register, onSubmit, errors } = useProfile(user);

  return (
    <section className="mt-4 w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-stretch"
      >
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Name"
            error={errors.name}
            {...register('name')}
          />

          <div />

          <TextField
            label="Description"
            placeholder='e.g. "I am a squirrel from Squirrelville"'
            error={errors.description}
            {...register('description')}
          />

          <div />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
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
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
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
        </div>

        <div className="mt-8 flex items-center space-x-2">
          <input
            type="checkbox"
            {...register('protected')}
          />
          <label className="text-midnight dark:text-white">Protect my profile</label>
        </div>

        <button
          type="submit"
          className="mt-8 w-auto self-start rounded bg-midnight px-16 py-2 text-white dark:bg-neutral-800"
        >
          Save
        </button>
      </form>
    </section>
  );
}

export default ProfileContainer;
