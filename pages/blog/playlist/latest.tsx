import { useEffect } from 'react';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Blog } from '../../../backend/Blog';
import { IPlaylist } from '../../../backend/models/IPlaylist';

export interface LatestPlaylistPageProps {
  playlist: IPlaylist;
}

const LatestPlaylistPage: NextPage<LatestPlaylistPageProps> = ({
  playlist,
}) => {
  const styles =
    'first-letter:text-7xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left sm:w-2/3 list-disc ml-2 sm:ml-16 my-16  ';
  useEffect(() => {
    document.querySelector('body')?.classList?.add('bg-gray-50');
  });

  return (
    <>
      <Head>
        <title>{playlist.title}</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,viewport-fit=cover"
        />
        <meta name="title" content={playlist.title} />
        <meta property="og:site_name" content="Vevericka" />
        <meta property="og:title" content={playlist.title} />
        <meta property="og:description" content={playlist.subtitle} />
        <meta
          property="og:image"
          content={'https:' + playlist.thumbnail.fields.file.url}
        />
        <meta
          property="og:url"
          content="https://vevericka.app/blog/playlist/latest"
        />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_US" />
      </Head>
      <div id="inject-styles" className={`hidden ${styles}`} />
      <main className="mt-16 mx-8 sm:mx-auto sm:container">
        <Link href="/">
          <a className="underline text-sm font-medium tracking-tighter text-midnight">
            Go to home
          </a>
        </Link>
        <div className="flex flex-col items-center pb-4 border-midnight border-b-2 sm:flex-row">
          <img
            src={playlist.thumbnail.fields.file.url}
            alt={playlist.thumbnail.fields.description}
            className="mt-8 rounded-full h-48 w-48 sm:h-32 sm:w-32"
          />
          <div className="sm:ml-8">
            <h1 className="text-2xl font-bold font-lato mt-8 text-midnight underline underline-offset-4 text-center sm:text-left">
              {playlist.title}
            </h1>
            <h2 className="font-lato mt-4 text-midnight text-center sm:text-left sm:mt-2">
              {playlist.subtitle}
            </h2>
          </div>
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: playlist.content }}
          className="mt-8"
        />
      </main>
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
