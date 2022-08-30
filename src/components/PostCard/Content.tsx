import { FeedPost } from '@services/post';
import React, { Fragment, useMemo, useState } from 'react';
import clsx from 'clsx';
import { getYoutubeIframe, preparePostText } from '@utils/index';
import { Dialog, Transition } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

export interface ContentProps {
  post: FeedPost;
}

function Content({ post }: ContentProps): JSX.Element {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const gridClass = useMemo(() => {
    return post.images.length === 1 ? 'grid grid-cols-1' : 'grid grid-cols-2';
  }, [post]);

  const youtubeIframe = useMemo(() => {
    return getYoutubeIframe(post.content);
  }, [post]);

  return (
    <>
      <p
        className="mt-4 break-words text-lg text-slate-700 dark:text-gray-400"
        dangerouslySetInnerHTML={{ __html: preparePostText(post.content) }}
      />

      {post.images.length > 0 && (
        <div className={clsx('mx-auto mt-8 grid', gridClass, 'place-items-center gap-4')}>
          {post.images.map((postImage, index) => (
            <button
              key={postImage.id}
              onClick={() => {
                setIsDialogOpen(true);
                setSelectedImageIndex(index);
              }}
            >
              <img
                src={postImage.url}
                alt=""
                className={clsx(
                  'aspect-video',
                  {
                    'max-h-[256px]': post.images.length > 1,
                    'h-full': post.images.length === 1,
                  },
                  'rounded-md object-cover'
                )}
              />
              <span className="sr-only">{postImage.id} Click to view</span>
            </button>
          ))}
        </div>
      )}

      {youtubeIframe && <div className="mt-4">{youtubeIframe}</div>}

      <Transition
        appear
        show={isDialogOpen}
        as={Fragment}
      >
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsDialogOpen(false)}
        >
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

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
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
              <div className="my-8 inline-block h-auto w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-neutral-800 md:h-auto">
                <div className="flex items-center justify-between">
                  <Dialog.Title className="text-center text-midnight dark:text-white">{post.content}</Dialog.Title>
                  <button onClick={() => setIsDialogOpen(false)}>
                    <XMarkIcon className="h-5 w-5 text-midnight dark:text-white" />
                  </button>
                </div>

                {selectedImageIndex !== null && (
                  <div className="mt-4 flex h-full w-full items-center">
                    {post.images.length !== 1 && (
                      <button
                        className="h-min rounded-full p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                        disabled={selectedImageIndex === 0}
                        onClick={() => {
                          setSelectedImageIndex(selectedImageIndex - 1);
                        }}
                      >
                        <ChevronLeftIcon className="h-5 w-5 text-midnight dark:text-white" />
                      </button>
                    )}

                    <img
                      src={post.images[selectedImageIndex]?.url ?? ''}
                      alt=""
                      className="mx-auto my-auto w-10/12 object-contain"
                    />

                    {post.images.length !== 1 && (
                      <button
                        className="h-min rounded-full p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                        disabled={selectedImageIndex === post.images.length - 1}
                        onClick={() => {
                          setSelectedImageIndex(selectedImageIndex + 1);
                        }}
                      >
                        <ChevronRightIcon className="h-5 w-5 text-midnight dark:text-white" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default Content;
