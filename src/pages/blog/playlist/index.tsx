import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import { BlogApi, Playlist } from '@services/blog';
import useTranslation from 'next-translate/useTranslation';

export interface PlaylistIndexPageProps {
  playlists: Playlist[];
}

const PlaylistIndexPage: NextPage<PlaylistIndexPageProps> = ({ playlists }) => {
  const { t } = useTranslation('blog');

  return (
    <>
      <Head>
        <title>{t('playlist.title')}</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,viewport-fit=cover"
        />
        <meta
          name="title"
          content={t('playlist.title')}
        />
        <meta
          property="og:site_name"
          content="Vevericka"
        />
        <meta
          property="og:title"
          content={t('playlist.title')}
        />
        <meta
          property="og:description"
          content={t('playlist.description')}
        />
        <meta
          property="og:image"
          content={'https:' + playlists[0]?.thumbnail.fields.file.url}
        />
        <meta
          property="og:url"
          content="https://vevericka.app/blog/playlist/latest"
        />
        <meta
          property="og:type"
          content="article"
        />
        <meta
          property="og:locale"
          content="en_US"
        />
      </Head>
      <main className="mx-8 mt-16 sm:container sm:mx-auto">
        <Link href="/">
          <a className="text-sm font-medium tracking-tighter text-midnight underline dark:text-white">Go to home</a>
        </Link>

        <div className="space-y-2 divide-y-2">
          {playlists.map((playlist) => (
            <article
              key={playlist.title}
              className="flex h-full items-center py-2"
            >
              <img
                className="h-48 w-48"
                src={playlist.thumbnail.fields.file.url}
                alt={playlist.thumbnail.fields.description}
              />

              <div className="ml-8">
                <Link href={`/blog/playlist/${playlist.startsAt.split('-')[0]}/${playlist.startsAt.split('-')[1]}`}>
                  <a className="font-lato text-2xl font-semibold text-slate-700 dark:text-white">{playlist.title}</a>
                </Link>
                <h3 className="font-lato text-sm">{playlist.subtitle}</h3>

                <div className="mt-4 flex items-center space-x-2">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={playlist.author.fields.profilePicture.fields.file.url}
                    alt={playlist.author.fields.profilePicture.fields.description}
                  />
                  <span className="text-sm font-bold">
                    {playlist.author.fields.firstName + ' ' + playlist.author.fields.lastName}
                  </span>
                </div>
              </div>

              <div className="ml-auto flex">
                <p className="text-sm font-semibold">{playlist.startsAt}</p>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PlaylistIndexPageProps> = async () => {
  const blogApi = new BlogApi();
  const allPlaylists = await blogApi.getAllPlaylists();

  if (allPlaylists === null) {
    return {
      redirect: {
        destination: 'error',
        permanent: false,
      },
    };
  }

  return {
    props: {
      playlists: allPlaylists,
    },
  };
};

export default PlaylistIndexPage;
