import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import React, { Fragment, useMemo, useState } from 'react';
import { FeedPost } from '../../service/common/models/FeedPost';
import { getYoutubeIframe, preparePostText } from '../../utils/Post.utils';

export interface PostCardContentProps {
  post: FeedPost;
}

const PostCardContent: React.FC<PostCardContentProps> = ({ post }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);

  const gridClass = useMemo(() => {
    return post.images.length === 1 ? 'grid grid-cols-1' : 'grid grid-cols-2';
  }, [post]);

  return (
    <>
      <p
        className="mt-4 break-words text-slate-700 dark:text-gray-400"
        dangerouslySetInnerHTML={{ __html: preparePostText(post.content) }}
      />

      {post.images.length > 0 && (
        <div className={`mx-auto mt-8 grid ${gridClass} place-items-center gap-4`}>
          {post.images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => {
                setIsDialogOpen(true);
                setSelectedImageId(image.id);
              }}
            >
              <img src={image.url} alt="" className="aspect-video max-h-[256px] rounded-md object-cover" />
            </button>
          ))}
        </div>
      )}

      <div className="mt-4">{getYoutubeIframe(post.content)}</div>
      <Transition appear show={isDialogOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={() => setIsDialogOpen(false)}>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="my-8 inline-block h-auto w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-neutral-800">
                <div className="flex items-center justify-end">
                  <button onClick={() => setIsDialogOpen(false)}>
                    <XIcon className="h-5 w-5 text-midnight dark:text-white" />
                  </button>
                </div>
                <div className="mt-4">
                  {selectedImageId !== null && (
                    <img
                      src={post.images.find((img) => img.id === selectedImageId)!.url}
                      alt=""
                      className="h-full w-full"
                    />
                  )}
                </div>

                <div className="mt-4 flex justify-center"></div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PostCardContent;
