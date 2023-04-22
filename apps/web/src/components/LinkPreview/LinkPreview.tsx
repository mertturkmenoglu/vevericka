import { LinkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Twitter, Wikipedia } from 'react-bootstrap-icons';
import { LinkPreviewQueryQuery } from '../../generated/graphql';
import { isTwitter, isWikipedia } from '../../lib';

export interface LinkPreviewProps {
  data: LinkPreviewQueryQuery;
}

function LinkPreview({ data }: LinkPreviewProps): JSX.Element {
  const isTwitterVal = isTwitter(data?.linkPreview.url || '');
  const isWikipediaVal = isWikipedia(data?.linkPreview.url || '');

  const urlWithValidProtocol = (url?: string | null | undefined) => {
    if (!url || url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }

    return `https://${url}`;
  };
  return (
    <a
      href={urlWithValidProtocol(data.linkPreview.url) ?? ''}
      className="mt-4 block rounded bg-neutral-100"
    >
      {data.linkPreview.image && (
        <img
          src={data.linkPreview.image}
          alt={data.linkPreview.title || ''}
          className="aspect-video w-full rounded-t object-cover"
        />
      )}

      {!data.linkPreview.image && (
        <div
          className={clsx('flex aspect-video w-full items-center justify-center rounded-t', {
            'bg-neutral-200': !isTwitterVal && !isWikipediaVal,
            'bg-[#1DA1F2]': isTwitterVal,
            'bg-[#C7C8CA]': isWikipediaVal,
          })}
        >
          {isTwitterVal && <Twitter className="h-16 w-16 text-white" />}
          {!isTwitterVal && !isWikipediaVal && <LinkIcon className="h-5 w-5 text-midnight" />}
          {isWikipediaVal && <Wikipedia className="h-16 w-16 text-black" />}
        </div>
      )}

      <div
        className="mt-2 px-2 font-medium"
        style={{
          fontFamily: 'Jost',
        }}
      >
        {data.linkPreview.title}
      </div>
      <div
        className="break-words px-2 pb-2 text-xs font-light"
        style={{
          fontFamily: 'Jost',
        }}
      >
        {data.linkPreview.description ?? data.linkPreview.url}
      </div>
    </a>
  );
}

export default LinkPreview;
