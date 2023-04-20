import { MainLayout } from '../../layouts';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useCreatePostForm } from './hooks/useCreatePostForm';
import CreateButton from './components/CreateButton';
import { useUploadcare } from './hooks/useUploadcare';
import TextAreaAutosize from 'react-textarea-autosize';
import './uploadcare.css';
import clsx from 'clsx';

function Create(): JSX.Element {
  const { register, handleSubmit, onSubmit, errors, loading, setImageUrls } = useCreatePostForm();
  useUploadcare(setImageUrls);

  return (
    <MainLayout>
      <div className="mx-auto w-2/3">
        <div className="text-2xl font-semibold">Create a new post</div>

        <hr className="mt-2" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col"
        >
          <TextAreaAutosize
            autoComplete="off"
            minRows={1}
            maxRows={3}
            className={clsx(
              'border-b border-midnight',
              {
                'border-red-500': errors.text?.type,
                'focus:border-primary': !errors.text?.type,
              },
              'py-2 text-sm font-medium text-midnight',
              'outline-none',
              'placeholder:text-sm placeholder:font-light',
              'disabled:text-neutral-500'
            )}
            placeholder="What is on your mind?"
            {...register('text')}
          />

          <span className="mt-2 text-sm font-medium text-red-500">{errors.text?.message}</span>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div id="img" />
              {/*<MetaButton type="poll" /> */}
            </div>
            <CreateButton loading={loading} />
          </div>
        </form>
      </div>
      <ToastContainer />
    </MainLayout>
  );
}

export default Create;
