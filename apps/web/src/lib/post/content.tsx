import { detectHashtags, detectUsernames, linkify } from './post-utils';

export const getPostContent = (text: string): JSX.Element => {
  const content = linkify(detectUsernames(detectHashtags(text)));
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      className="text-sm"
    />
  );
};
