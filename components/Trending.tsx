import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { ITag } from '../backend/models/ITag';
import Link from 'next/link';

export interface TrendingProps {}

const Trending: React.FC<TrendingProps> = ({}) => {
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState<ITag[]>([]);
  const { data } = useSession();

  const fetchTrending = useCallback(async (): Promise<ITag[]> => {
    return [];
    // if (!data) {
    //   return [];
    // }
    //
    // const exploreApi = new Explore(data.jwt);
    // const tags = await exploreApi.getTags();
    // return tags.sort((a, b) => b.count - a.count).slice(0, 5);
  }, []);

  useEffect(() => {
    if (data && loading) {
      fetchTrending().then((value) => {
        setTags(value);
        setLoading(false);
      });
    }
  }, [data, loading, fetchTrending]);

  if (loading) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-md bg-slate-50 shadow-sm dark:bg-neutral-800">
        <Image src="/assets/loading_standard.gif" width={96} height={96} alt="Loading" />
      </div>
    );
  }

  return (
    <div className="w-full rounded-md bg-slate-100 p-4 shadow-sm dark:bg-neutral-800">
      <div className="text-deep-orange text-2xl">Explore Vevericka</div>
      <div className="mt-4 flex w-full flex-col space-y-2 divide-y-2">
        {tags.length > 0 &&
          tags.map((tag) => (
            <div key={tag.tag}>
              <Link href={`/explore/${tag.tag}`}>
                <a className="flex items-center pt-2">
                  <span className="text-deep-orange text-xl font-black">#</span>
                  <span className="ml-2 text-lg font-medium text-slate-700 dark:text-gray-200">{tag.tag}</span>
                </a>
              </Link>
              <span className="text-sm text-slate-500">{tag.count} posts</span>
            </div>
          ))}
        {tags.length === 0 && <div className="flex w-full items-center pt-2">We couldn&apos;t find any results</div>}
      </div>
      <div className="flex w-full justify-end">
        <Link href="/explore">
          <a className="text-deep-orange rounded-full py-2 px-4 text-sm font-medium uppercase hover:bg-orange-100 hover:bg-opacity-25">
            MORE
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Trending;
