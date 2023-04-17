import { MainLayout } from '../../layouts';
import { TextArea } from '../../components';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useCreatePostForm } from './hooks/useCreatePostForm';
import CreateButton from './components/CreateButton';
import { useUploadcare } from './hooks/useUploadcare';
import './uploadcare.css';

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
          <TextArea
            label=""
            autoComplete="off"
            rows={1}
            labelClassName="mt-4"
            placeholder="What is on your mind?"
            error={errors.text}
            {...register('text')}
          />

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
