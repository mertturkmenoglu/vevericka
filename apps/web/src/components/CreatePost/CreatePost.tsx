import { useState } from 'react';
import TextArea from './TextArea';
import { useCreatePostForm } from './useCreatePost';
import Actions from './Actions';
import EmojiPicker from './EmojiPicker';
import CreateButton from './CreateButton';
import clsx from 'clsx';
import { useUploadcare } from '../../hooks';

export interface CreatePostProps {
  className?: string;
}

function CreatePost({ className }: CreatePostProps): JSX.Element {
  const { register, handleSubmit, onSubmit, errors, loading, setImageUrls, setValue, getValues } = useCreatePostForm();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  useUploadcare({
    contextName: 'post-create',
    id: 'post-create',
    onDataOutput: (event) => {
      const e = event as CustomEvent;
      const images = e.detail.data.map((item: { cdnUrl: string }) => item.cdnUrl);
      setImageUrls(images);
    },
  });

  return (
    <>
      <form
        className={clsx('flex flex-col', className)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextArea
          errors={errors}
          register={register}
        />

        <Actions>
          <div className="flex items-center space-x-2">
            <div id="post-create" />
            <EmojiPicker
              show={showEmojiPicker}
              setShow={setShowEmojiPicker}
              onEmojiClick={(emoji) => {
                const currentValue = getValues('text');
                setValue('text', currentValue + emoji.emoji);
              }}
            />
          </div>

          <CreateButton loading={loading} />
        </Actions>
      </form>
    </>
  );
}

export default CreatePost;
