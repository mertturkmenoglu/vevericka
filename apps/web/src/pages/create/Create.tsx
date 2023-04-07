import { z } from 'zod';
import { MainLayout } from '../../layouts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '../../components';
import { ChartBarIcon, PhotoIcon, VideoCameraIcon } from '@heroicons/react/24/outline';

const schema = z.object({
  text: z.string().min(1, 'Cannot leave blank').max(250, 'Too long'),
});

type FormValues = z.infer<typeof schema>;

function Create(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    console.log({ data });
  };

  return (
    <MainLayout>
      <div className="mx-auto w-2/3">
        <div className="text-2xl font-semibold">Create a new post</div>

        <hr className="mt-2" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col"
        >
          <TextField
            label=""
            labelClassName="mt-4"
            placeholder="What is on your mind?"
            error={errors.text}
            {...register('text')}
          />

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button className="rounded bg-midnight p-2 transition ease-in-out hover:bg-midnight/90">
                <PhotoIcon className="h-4 w-4 text-white" />
              </button>

              <button className="rounded bg-midnight p-2 transition ease-in-out hover:bg-midnight/90">
                <VideoCameraIcon className="h-4 w-4 text-white" />
              </button>

              <button className="rounded bg-midnight p-2 transition ease-in-out hover:bg-midnight/90">
                <ChartBarIcon className="h-4 w-4 text-white" />
              </button>
            </div>
            <button
              type="submit"
              className="w-min rounded bg-midnight px-4 py-1 text-white transition ease-in-out hover:bg-midnight/90"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}

export default Create;
