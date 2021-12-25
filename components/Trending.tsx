import { useEffect, useState } from 'react';
import Image from 'next/image';

export interface TrendingProps {}

const Trending: React.FC<TrendingProps> = ({}) => {
  const [loading, setLoading] = useState(true);

  const fetchTrending = async () => {};

  useEffect(() => {
    fetchTrending().then(() => {
      setLoading(true);
    });
  }, []);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center h-64 bg-slate-50 rounded-md shadow-sm">
        <Image src="/assets/loading_standard.gif" width={96} height={96} />
      </div>
    );
  }

  return <></>;
};

export default Trending;
