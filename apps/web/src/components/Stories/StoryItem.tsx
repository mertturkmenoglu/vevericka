import clsx from 'clsx';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import { FragmentType, useFragment } from '../../generated';
import { StoryFragment, UserFragment } from '../../graphql';
import { LazyImage } from '../LazyImage';

export interface StoryItemProps {
  story: FragmentType<typeof StoryFragment>;
}

function StoryItem({ story }: StoryItemProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const s = useFragment(StoryFragment, story);
  const user = useFragment(UserFragment, s.user);

  return (
    <button
      onClick={() => {
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, s.duration * 1000);
      }}
      className="px-2 py-4"
    >
      <LazyImage
        src={user.image}
        alt="User image"
        placeholderSrc="/user.jpg"
        placeholderAlt="Loading"
        className={clsx('min-h-12 min-w-12 aspect-square h-12 w-12 rounded-full object-cover', {
          'ring-2 ring-berry ring-offset-2': !s.seen,
        })}
      />

      <Lightbox
        open={open}
        controller={{
          closeOnBackdropClick: true,
        }}
        close={() => setOpen(false)}
        carousel={{
          finite: true,
        }}
        slides={[
          {
            src: s.source,
          },
        ]}
        styles={{
          container: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
        }}
      />
    </button>
  );
}

export default StoryItem;
