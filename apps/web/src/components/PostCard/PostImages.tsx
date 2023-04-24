import clsx from 'clsx';
import { useState } from 'react';
import Lightbox, { SlideImage } from 'yet-another-react-lightbox';

import 'yet-another-react-lightbox/styles.css';
import { LazyImage } from '../LazyImage';
import { useGridRoundStyles } from './hooks';

type PostImageItem = {
  id: string;
  url: string;
  postId: string;
  createdAt: string;
  updatedAt: string;
};

export interface PostImagesProps {
  images: PostImageItem[];
}

function PostImages({ images }: PostImagesProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const roundedStyles = useGridRoundStyles();
  const slides: SlideImage[] = images.map((img) => ({ src: img.url }));

  if (images.length === 0) {
    return <></>;
  }

  return (
    <>
      <div
        className={clsx('my-4 grid gap-[1px]', {
          'mx-auto grid-cols-1': images.length === 1,
          'grid-cols-2': images.length === 2 || images.length === 4,
          'grid-cols-3': images.length === 3,
        })}
      >
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => {
              setImageIndex(index);
              setOpen(true);
            }}
          >
            <LazyImage
              src={image.url}
              alt="User image"
              placeholderSrc="/user.jpg"
              placeholderAlt="Loading"
              className={clsx(
                'h-full w-full object-cover',
                {
                  'aspect-square': images.length !== 1,
                  'aspect-auto': images.length === 1,
                },
                roundedStyles(images.length, index)
              )}
            />
          </button>
        ))}
      </div>

      <Lightbox
        open={open}
        controller={{
          closeOnBackdropClick: true,
        }}
        close={() => setOpen(false)}
        index={imageIndex}
        carousel={{
          finite: true,
        }}
        slides={slides}
        styles={{
          container: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
        }}
      />
    </>
  );
}

export default PostImages;
