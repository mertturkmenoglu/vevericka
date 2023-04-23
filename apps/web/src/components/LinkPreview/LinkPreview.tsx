import clsx from 'clsx';
import { LinkPreviewQuery } from '../../generated/graphql';
import { isTwitter, isWikipedia } from '../../lib';
import { getValidDescription, getValidUrl } from './helpers';
import LinkPreviewContent from './LinkPreviewContent';
import LinkPreviewImage from './LinkPreviewImage';

export interface LinkPreviewProps {
  data: LinkPreviewQuery;
}

function LinkPreview({ data: { linkPreview } }: LinkPreviewProps): JSX.Element {
  const isTwitterVal = isTwitter(linkPreview.url || '');
  const isWikipediaVal = isWikipedia(linkPreview.url || '');
  const url = getValidUrl(linkPreview.url);
  const hasImage = !!linkPreview.image;
  const isHorizontal = !hasImage;
  const description = getValidDescription(linkPreview);

  return (
    <a
      href={url}
      className={clsx('mt-4 rounded bg-neutral-100', {
        'flex h-full min-h-[8rem] items-stretch space-x-2': isHorizontal,
        block: !isHorizontal,
      })}
    >
      <LinkPreviewImage
        image={linkPreview.image}
        isHorizontal={isHorizontal}
        alt={linkPreview.description ?? ''}
        isTwitter={isTwitterVal}
        isWikipedia={isWikipediaVal}
      />

      <LinkPreviewContent
        isHorizontal={isHorizontal}
        title={linkPreview.title ?? ''}
        description={description}
      />
    </a>
  );
}

export default LinkPreview;
