export const getYoutubeIframe = (text: string): JSX.Element | null => {
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
  const youtubeMatch = text.match(youtubeRegex);
  if (youtubeMatch) {
    const youtubeId = youtubeMatch[1];
    return (
      <div className="flex w-full flex-col items-center justify-center">
        <iframe
          title="youtube"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
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
