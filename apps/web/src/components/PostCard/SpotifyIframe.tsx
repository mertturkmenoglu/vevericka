export type SpotifyType = 'track' | 'album' | 'playlist' | 'show' | 'episode' | 'artist';

export interface SpotifyIframeProps {
  id: string;
  type: 'track' | 'album' | 'playlist' | 'show' | 'episode' | 'artist';
}

function SpotifyIframe({ id, type }: SpotifyIframeProps): JSX.Element {
  return (
    <div className="mt-2 flex w-full flex-col items-center justify-center">
      <iframe
        style={{
          borderRadius: 4,
        }}
        src={`https://open.spotify.com/embed/${type}/${id}?theme=0`}
        width="100%"
        height="352"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded"
      />
    </div>
  );
}

export default SpotifyIframe;
