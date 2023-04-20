import { MainLayout } from '../../layouts';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useCreatePostForm } from './hooks/useCreatePostForm';
import CreateButton from './components/CreateButton';
import { useUploadcare } from './hooks/useUploadcare';
import TextAreaAutosize from 'react-textarea-autosize';
import './uploadcare.css';
import clsx from 'clsx';
import { Helmet } from 'react-helmet';
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import { FaceSmileIcon } from '@heroicons/react/24/outline';

function Create(): JSX.Element {
  const { register, handleSubmit, onSubmit, errors, loading, setImageUrls, setValue, getValues } = useCreatePostForm();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  useUploadcare(setImageUrls);

  return (
    <MainLayout>
      <div className="mx-auto w-2/3">
        <Helmet>
          <title>New Post | Vevericka</title>
        </Helmet>
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
              <button
                type="button"
                className="group relative flex items-center rounded-full px-2 py-2 transition duration-200 ease-in-out hover:bg-berry/10"
                onClick={() => setShowEmojiPicker((prev) => !prev)}
              >
                <FaceSmileIcon className="h-5 w-5 text-berry" />
                <span className="text-white"></span>
                {showEmojiPicker && (
                  <div className="absolute left-0 top-12">
                    <EmojiPicker
                      lazyLoadEmojis={true}
                      onEmojiClick={(emojiObject) => {
                        const currentValue = getValues('text');
                        setValue('text', currentValue + emojiObject.emoji);
                      }}
                    />
                  </div>
                )}
              </button>
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
