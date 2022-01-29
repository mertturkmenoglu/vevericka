import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { ITag } from '../api/models/ITag';
import { Explore } from '../api/Explore';
import Link from 'next/link';

export interface TrendingProps {}

const Trending: React.FC<TrendingProps> = ({}) => {
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState<ITag[]>([]);
  const { data } = useSession();

  const fetchTrending = useCallback(async (): Promise<ITag[]> => {
    if (!data) {
      return [];
    }

    const exploreApi = new Explore(data.jwt);
    const tags = await exploreApi.getTags();
    return tags.sort((a, b) => b.count - a.count).slice(0, 5);
  }, [data]);

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
      <div className="w-full flex items-center justify-center h-64 bg-slate-50 dark:bg-neutral-800 rounded-md shadow-sm">
        <Image
          src="/assets/loading_standard.gif"
          width={96}
          height={96}
          alt="Loading"
        />
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-100 rounded-md shadow-sm p-4 dark:bg-neutral-800">
      <div className="text-2xl text-deep-orange">Explore Vevericka</div>
      <div className="mt-4 divide-y-2 flex flex-col space-y-2 w-full">
        {tags.length > 0 &&
          tags.map((tag) => (
            <div key={tag.tag}>
              <Link href={`/explore/${tag.tag}`}>
                <a className="pt-2 flex items-center">
                  <span className="font-black text-xl text-deep-orange">#</span>
                  <span className="ml-2 text-slate-700 font-medium text-lg dark:text-gray-200">
                    {tag.tag}
                  </span>
                </a>
              </Link>
              <span className="text-sm text-slate-500">{tag.count} posts</span>
            </div>
          ))}
        {tags.length === 0 && (
          <div className="pt-2 flex items-center w-full">
            We couldn&apos;t find any results
          </div>
        )}
      </div>
      <div className="w-full flex justify-end">
        <Link href="/explore">
          <a className="uppercase text-sm text-deep-orange font-medium py-2 px-4 rounded-full hover:bg-orange-100 hover:bg-opacity-25">
            MORE
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Trending;
