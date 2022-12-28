import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { ReactComponent as SquirrelLogo } from '../../assets/squirrel.svg';
import { Link } from 'react-router-dom';

function NotFound(): JSX.Element {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <SquirrelLogo
        className="h-12 w-12 text-berry"
        viewBox="0 0 512 512"
      />
      <p className="mt-8 text-lg font-medium text-berry">404</p>
      <h2 className="mt-2 text-4xl font-bold">Not Found</h2>
      <p className="mt-2 text-sm font-light text-gray-800">Sorry, we couldn't find the page you're looking for.</p>
      <Link
        to="/"
        className="mt-8 flex items-center space-x-2"
      >
        <span className="text-sm hover:underline">Go back home</span>
        <ArrowRightIcon className="h-4 w-4" />
      </Link>

      <div className="mt-16 flex items-center space-x-2 divide-x-2">
        <Link
          to="/contact"
          className="text-sm text-gray-800 hover:underline"
        >
          Contact
        </Link>
        <Link
          to="/blog"
          className="pl-2 text-sm text-gray-800 hover:underline"
        >
          Blog
        </Link>
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
