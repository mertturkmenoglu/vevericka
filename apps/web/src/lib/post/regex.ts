import urlRegexLib from 'url-regex';

const usernameRegex = /@[-A-Z0-9_]+/gi;
const hashtagRegex = /#[-A-Z0-9_]+/gi;

const urlRegex = urlRegexLib({
  strict: true,
});

const spotifyRegex = /(http|https):\/\/open\.spotify\.com\/(track|album|playlist|show|episode|artist)\/[a-zA-Z0-9]+/;

const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;

const twitterRegex = /https?:\/\/(?:www\.)?twitter\.com/;

const wikipediaRegex = /^https?:\/\/([\w.]+)wikipedia.org\/wiki\/(\w+_?)+/;

export { usernameRegex, hashtagRegex, urlRegex, spotifyRegex, youtubeRegex, twitterRegex, wikipediaRegex };
