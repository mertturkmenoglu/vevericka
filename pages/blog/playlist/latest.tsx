import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { Blog } from '../../../backend/Blog';
import { IPlaylist } from '../../../backend/models/IPlaylist';

export interface LatestPlaylistPageProps {
  playlist: IPlaylist;
}

const LatestPlaylistPage: NextPage<LatestPlaylistPageProps> = ({
  playlist,
}) => {
  return (
    <>
      <h1>{playlist.title}</h1>
      <h2>{playlist.subtitle}</h2>
      <div dangerouslySetInnerHTML={{ __html: playlist.content }} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  LatestPlaylistPageProps
> = async () => {
  const blogApi = new Blog();
  const latest = await blogApi.getLatestPlaylist();

  if (latest === null) {
    return {
      redirect: {
        destination: 'error',
        permanent: false,
      },
    };
  }

  return {
    props: {
      playlist: latest,
    },
  };
};

export default LatestPlaylistPage;
