import { LinkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Twitter } from 'react-bootstrap-icons';
import { LinkPreviewQueryQuery } from '../../generated/graphql';
import { useTwitter } from './useTwitter';

export interface LinkPreviewProps {
  data: LinkPreviewQueryQuery;
}

function LinkPreview({ data }: LinkPreviewProps): JSX.Element {
  const { isTwitter } = useTwitter(data?.linkPreview.url || '');
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
            'bg-neutral-200': !isTwitter,
            'bg-[#1DA1F2]': isTwitter,
          })}
        >
          {isTwitter && <Twitter className="h-6 w-6 text-white" />}
          {!isTwitter && <LinkIcon className="h-5 w-5 text-midnight" />}
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
