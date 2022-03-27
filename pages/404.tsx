import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

const NotFound: NextPage = () => {
  return (
    <>
      <Head>
        <title>Not Found | Vevericka</title>
      </Head>
      <main className="flex h-screen  w-screen flex-col items-center justify-center">
        <Image src="/assets/icon_primary.svg" width={128} height={128} alt="Vevericka logo" />
        <h1 className="text-deep-orange mt-16 text-4xl font-bold">
          <Image src="/assets/nut_primary.svg" width={32} height={32} alt="Nut" className="pt-2" />
          <span className="ml-3">Not Found</span>
        </h1>
        <div className="mt-4 text-xl tracking-wide text-slate-700 dark:text-white">
          Oops <span className="text-deep-orange font-bold">...</span> We can&apos;t remember where we buried the nuts{' '}
          <span className="text-deep-orange font-bold">:(</span>
        </div>
        <div className="text-slate-700 dark:text-white">
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

export default NotFound;
