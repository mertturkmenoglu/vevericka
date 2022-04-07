const URL_REGEX = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
const USERNAME_REGEX = /@[-A-Z0-9_]+/gi;
const HASHTAG_REGEX = /#[-A-Z0-9_]+/gi;

const className = 'text-primary hover:underline';

const detectHashtags = (text: string): string =>
  text.replace(HASHTAG_REGEX, (h) => `<a href='/explore/${h.substr(1)}' class='${className}'>${h}</a>`);

const detectUsernames = (text: string): string =>
  text.replace(USERNAME_REGEX, (u) => `<a href='/user/${u.substr(1)}' class='${className}'>${u}</a>`);

const linkify = (text: string): string =>
  text.replace(URL_REGEX, (url) => `<a href='${url}' class='${className}'>${url}</a>`);

export const getYoutubeIframe = (text: string): JSX.Element | null => {
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
  const youtubeMatch = text.match(youtubeRegex);
  if (youtubeMatch) {
    const youtubeId = youtubeMatch[1];
    return (
      <div className="flex w-full flex-col items-center justify-center">
        <iframe
          title="youtube"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          className="aspect-video w-full"
          // width="560"
          // height="315"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  return null;
};

export const getPostContent = (text: string): JSX.Element => {
  const content = linkify(detectUsernames(detectHashtags(text)));
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export const preparePostText = (text: string): string => {
  const usernamesDetected = detectUsernames(text);
  const hashtagsDetected = detectHashtags(usernamesDetected);
  return linkify(hashtagsDetected);
};

export const copyToClipboard = (text: string): void => {
  const tmpInput = document.createElement('input');
  tmpInput.value = text;
  document.body.appendChild(tmpInput);
  tmpInput.select();
  document.execCommand('copy');
  document.body.removeChild(tmpInput);
};
