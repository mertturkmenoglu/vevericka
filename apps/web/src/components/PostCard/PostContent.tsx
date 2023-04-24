import { prepare } from '../../lib';
import { LinkPreview } from '../LinkPreview';
import { useEmbed, useLinkPreview } from './hooks';

export interface PostContentProps {
  text: string;
  hasMedia: boolean;
}

function PostContent({ text, hasMedia }: PostContentProps): JSX.Element {
  const content = prepare(text);
  const embed = useEmbed(text, hasMedia);
  const { showLinkPreview, data } = useLinkPreview(text, { hasMedia, isEmbed: embed !== null });

  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="line break-words break-all text-sm leading-5 text-midnight antialiased dark:text-white"
      />
      {embed && embed}
      {showLinkPreview && data && <LinkPreview data={data} />}
    </>
  );
}

export default PostContent;
