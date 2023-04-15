import { detectHashtags, detectUsernames, linkify } from './post-utils';
import { getYoutubeIframe } from './youtube-iframe';

export const getPostContent = (text: string): JSX.Element => {
  const content = linkify(detectUsernames(detectHashtags(text)));
  const youtubeIframe = getYoutubeIframe(content);
  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="text-sm"
      />
      {youtubeIframe}
    </>
  );
};
