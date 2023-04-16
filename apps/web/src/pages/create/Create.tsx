import { MainLayout } from '../../layouts';
import { TextField } from '../../components';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useCreatePostForm } from './hooks/useCreatePostForm';
import CreateButton from './components/CreateButton';
import './uploadcare.css';

import { connectBlocksFrom } from '@uploadcare/blocks/abstract/connectBlocksFrom';
import { useEffect } from 'react';

const STYLES = 'https://unpkg.com/@uploadcare/blocks@0.17.1/web/file-uploader-regular.min.css';

function Create(): JSX.Element {
  const { register, handleSubmit, onSubmit, errors, loading, setImageUrls } = useCreatePostForm();

  useEffect(() => {
    const fn = async () => {
      const blocks = await connectBlocksFrom('https://unpkg.com/@uploadcare/blocks@0.17.1/web/blocks-browser.min.js');

      if (!blocks) {
        return; // To avoid errors in SSR case
      }

      const el = document.getElementById('img');

      if (el?.hasChildNodes()) {
        return;
      }

      // Now you can add uploader using native DOM API methods
      const uploader = new blocks.FileUploaderRegular();
      uploader.setAttribute('css-src', STYLES);
      uploader.classList.add('my-config-class');

      document.getElementById('img')?.appendChild(uploader);
    };

    fn();

    const onDataOutput = (event: Event) => {
      const e = event as CustomEvent;
      const images = e.detail.data.map((item: { cdnUrl: string }) => item.cdnUrl);
      setImageUrls(images);
    };

    window.addEventListener('LR_DATA_OUTPUT', onDataOutput);

    return () => {
      window.removeEventListener('LR_DATA_OUTPUT', onDataOutput);
    };
  }, []);

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
