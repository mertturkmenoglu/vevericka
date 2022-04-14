import { useMemo } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';

export type ErrorObj = {
  key: string;
  title: string;
  message: string | JSX.Element;
};

export const errorCodeMap: Record<number, ErrorObj> = {
  0: {
    key: 'generic',
    title: 'Vevericka',
    message: 'Something went wrong. Sometimes squirrels cannot understand what is going on.',
  },
  1: {
    key: 'post-not-found',
    title: 'Post Not Found | Vevericka',
    message: (
      <div className="flex flex-col items-center text-center text-sm sm:text-xl">
        <p>We cannot find the post you were looking for.</p>
        <p>
          Sometimes <span className="text-deep-orange">avocados</span> can go missing but this has nothing to do with{' '}
          <span className="text-deep-orange">Thumbelina</span>.
        </p>
      </div>
    ),
  },
  2: {
    key: 'user-not-found',
    title: 'User Not Found | Vevericka',
    message:
      "The squirrel you were looking is not here. Maybe it's in another tree? If you 'Vik', maybe you can get a response.",
  },
};

const Error: NextPage = () => {
  const router = useRouter();

  const error = useMemo(() => {
    const errorCode = router.query.code;

    if (typeof errorCode !== 'string') {
      return errorCodeMap[0];
    }

    const codeNumber = parseInt(errorCode, 10) || 0;
    return errorCodeMap[codeNumber];
  }, [router]);

  const title = useMemo(() => {
    return error.title;
  }, [error]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className="flex h-screen w-screen flex-col items-center justify-center">
        <Image src="/assets/nut_primary.svg" width={32} height={32} alt="Nut" />
        <div className="mt-4 text-xl tracking-wide text-slate-700 dark:text-white">{error.message}</div>
        <div className="mt-8 text-slate-700 dark:text-white">
          <span className="text-deep-orange font-bold">[</span>
          <span className="font-regular text-sm">Sad squirrel noises</span>
          <span className="text-deep-orange font-bold">]</span>
        </div>
        <Link href="/">
          <a className="text-deep-orange focus:outline-deep-orange underline hover:no-underline focus:outline-offset-2">
            Go to Home
          </a>
        </Link>
      </main>
    </>
  );
};

export default Error;
