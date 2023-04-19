export function useYouTube(text: string) {
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
  const youtubeMatch = text.match(youtubeRegex);
  const youtubeId = youtubeMatch ? youtubeMatch[1] : null;
  const isYouTube = youtubeId !== null;

  return { isYouTube, youtubeId };
}
