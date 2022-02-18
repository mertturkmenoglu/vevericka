const URL_REGEX =
  /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
const USERNAME_REGEX = /@[-A-Z0-9_]+/gi;
const HASHTAG_REGEX = /#[-A-Z0-9_]+/gi;

const className = 'text-deep-orange hover:underline';

const detectHashtags = (text: string): string =>
  text.replace(
    HASHTAG_REGEX,
    (h) => `<a href='/explore/${h.substr(1)}' class='${className}'>${h}</a>`
  );

const detectUsernames = (text: string): string =>
  text.replace(
    USERNAME_REGEX,
    (u) => `<a href='/user/${u.substr(1)}' class='${className}'>${u}</a>`
  );

const linkify = (text: string): string =>
  text.replace(
    URL_REGEX,
    (url) => `<a href='${url}' class='${className}'>${url}</a>`
  );

export const preparePostText = (text: string): string => {
  const usernamesDetected = detectUsernames(text);
  const hashtagsDetected = detectHashtags(usernamesDetected);
  return linkify(hashtagsDetected);
};
