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

const LatestPlaylistPage: NextPage<LatestPlaylistPageProps> = ({ playlist }) => {
  const styles =
    'first-letter:text-7xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left sm:w-2/3 list-disc ml-2 sm:ml-16 my-16';
  useEffect(() => {
    document.querySelector('body')?.classList?.add('bg-gray-50');
  });

  return (
    <>
      <Head>
        <title>{playlist.title}</title>
        <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
        <meta name="title" content={playlist.title} />
        <meta property="og:site_name" content="Vevericka" />
        <meta property="og:title" content={playlist.title} />
        <meta property="og:description" content={playlist.subtitle} />
        <meta property="og:image" content={'https:' + playlist.thumbnail.fields.file.url} />
        <meta property="og:url" content="https://vevericka.app/blog/playlist/latest" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_US" />
      </Head>
      <div id="inject-styles" className={`hidden ${styles}`} />
      <main className="mx-8 mt-16 sm:container sm:mx-auto">
        <Link href="/">
          <a className="text-sm font-medium tracking-tighter text-midnight underline dark:text-white">Go to home</a>
        </Link>
        <div className="flex flex-col items-center border-b-2 border-midnight pb-4 sm:flex-row">
          <img
            src={playlist.thumbnail.fields.file.url}
            alt={playlist.thumbnail.fields.description}
            className="mt-8 h-48 w-48 rounded-full sm:h-32 sm:w-32"
          />
          <div className="sm:ml-8">
            <h1 className="font-lato mt-8 text-center text-2xl font-bold text-midnight underline underline-offset-4 dark:text-white sm:text-left">
              {playlist.title}
            </h1>
            <h2 className="font-lato mt-4 text-center text-midnight dark:text-white sm:mt-2 sm:text-left">
              {playlist.subtitle}
            </h2>
          </div>
        </div>

        <div dangerouslySetInnerHTML={{ __html: playlist.content }} className="mt-8" />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<LatestPlaylistPageProps> = async () => {
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
