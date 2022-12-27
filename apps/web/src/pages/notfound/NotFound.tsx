import { ArrowRightIcon } from '@heroicons/react/24/outline';

function NotFound(): JSX.Element {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <img
        src="/squirrel.svg"
        className="h-12 w-12"
        alt="App logo"
      />
      <p className="mt-8 text-lg font-medium text-berry">404</p>
      <h2 className="mt-2 text-4xl font-bold">Not Found</h2>
      <p className="mt-2 text-sm font-light text-gray-800">Sorry, we couldn't find the page you're looking for.</p>
      <a
        href="/"
        className="mt-8 flex items-center space-x-2"
      >
        <span className="text-sm hover:underline">Go back home</span>
        <ArrowRightIcon className="h-4 w-4" />
      </a>

      <div className="mt-16 flex items-center space-x-2 divide-x-2">
        <a
          href="/contact"
          className="text-sm text-gray-800 hover:underline"
        >
          Contact
        </a>
        <a
          href="/blog"
          className="pl-2 text-sm text-gray-800 hover:underline"
        >
          Blog
        </a>
        <a
          href="https://twitter.com/capreaee"
          className="pl-2 text-sm text-gray-800 hover:underline"
        >
          Twitter
        </a>
      </div>
    </div>
  );
}

export default NotFound;