export interface YouTubeIframeProps {
  id: string;
}

function YouTubeIframe({ id }: YouTubeIframeProps): JSX.Element {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <iframe
        title="youtube"
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        className="mt-2 aspect-video w-full rounded"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default YouTubeIframe;
