import { useMutation } from '@apollo/client';
import clsx from 'clsx';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/plugins/counter.css';
import { FragmentType, useFragment } from '../../generated';
import { markStoryAsSeenDocument, StoryFragment, UserFragment } from '../../graphql';
import { StoryFeedFragment } from '../../graphql/fragments/storyFeedFragment';
import { LazyImage } from '../LazyImage';

export interface StoryItemProps {
  story: FragmentType<typeof StoryFeedFragment>;
}

function StoryItem({ story }: StoryItemProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const feedItem = useFragment(StoryFeedFragment, story);
  const stories = useFragment(StoryFragment, feedItem.stories);
  const [markStoryAsSeenMutation] = useMutation(markStoryAsSeenDocument, {
    variables: {
      id: stories[0].id,
    },
  });
  const user = useFragment(UserFragment, feedItem.user);

  return (
    <button
      onClick={async () => {
        console.log('a');
        await markStoryAsSeenMutation();
        setOpen(true);
      }}
      className="px-2 py-4"
    >
      <LazyImage
        src={user.image}
        alt="User image"
        placeholderSrc="/user.jpg"
        placeholderAlt="Loading"
        className={clsx('min-h-12 min-w-12 aspect-square h-12 w-12 rounded-full object-cover', {
          'ring-2 ring-berry ring-offset-2': !feedItem.hasSeenAll,
        })}
      />

      <Lightbox
        open={open}
        plugins={[Counter]}
        controller={{
          closeOnBackdropClick: true,
        }}
        close={() => setOpen(false)}
        carousel={{
          finite: true,
        }}
        counter={{ style: { top: 'unset', bottom: 0 } }}
        slides={stories.map((s) => ({
          src: s.source,
        }))}
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
