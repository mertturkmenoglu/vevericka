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
      <main className="w-screen h-screen  flex items-center justify-center flex-col">
        <Image
          src="/assets/icon_primary.svg"
          width={128}
          height={128}
          alt="Vevericka logo"
        />
        <h1 className="mt-16 font-bold text-4xl text-deep-orange">
          <Image
            src="/assets/nut_primary.svg"
            width={32}
            height={32}
            alt="Nut"
            className="pt-2"
          />
          <span className="ml-3">Not Found</span>
        </h1>
        <div className="mt-4 tracking-wide text-xl text-slate-700 dark:text-white">
          Oops <span className="text-deep-orange font-bold">...</span> We can't
          remember where we buried the nuts{' '}
          <span className="text-deep-orange font-bold">:(</span>
        </div>
        <div className="text-slate-700 dark:text-white">
          <span className="text-deep-orange font-bold">[</span>
          <span className="font-regular text-sm">Sad squirrel noises</span>
          <span className="text-deep-orange font-bold">]</span>
        </div>
        <Link href="/">
          <a className="text-deep-orange underline hover:no-underline focus:outline-offset-2 focus:outline-deep-orange">
            Go to Home
          </a>
        </Link>
      </main>
    </>
  );
};

export default NotFound;
