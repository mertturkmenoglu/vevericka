import { LinkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Twitter, Wikipedia } from 'react-bootstrap-icons';

export interface LinkPreviewImageProps {
  image: string | null | undefined;
  isHorizontal: boolean;
  alt: string;
  isTwitter: boolean;
  isWikipedia: boolean;
}

function LinkPreviewImage({ image, isHorizontal, alt, isWikipedia, isTwitter }: LinkPreviewImageProps): JSX.Element {
  return (
    <>
      {image && (
        <img
          src={image}
          alt={alt}
          className={clsx({
            'aspect-video w-full rounded-t object-cover': !isHorizontal,
            'w-32 rounded-l object-cover': isHorizontal,
          })}
        />
      )}

      {!image && (
        <div
          className={clsx('flex items-center justify-center', {
            'bg-neutral-200': !isTwitter && !isWikipedia,
            'bg-[#1DA1F2]': isTwitter,
            'bg-[#C7C8CA]': isWikipedia,
            'aspect-video w-full rounded-t': !isHorizontal,
            'w-32 min-w-[8rem] rounded-l': isHorizontal,
          })}
        >
          {isTwitter && <Twitter className="h-16 w-16 text-white" />}
          {!isTwitter && !isWikipedia && <LinkIcon className="h-5 w-5 text-midnight" />}
          {isWikipedia && <Wikipedia className="h-16 w-16 text-black" />}
        </div>
      )}
    </>
  );
}

export default LinkPreviewImage;
