import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ReactComponent as SquirrelLogo } from '../../assets/squirrel.svg';

function NotFound(): JSX.Element {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Helmet>
        <title>404 | Vevericka</title>
      </Helmet>
      <SquirrelLogo
        className="h-12 w-12 text-berry"
        viewBox="0 0 512 512"
      />
      <p className="mt-8 text-lg font-medium text-berry">404</p>
      <h2 className="mt-2 text-4xl font-bold text-midnight dark:text-white">Not Found</h2>
      <p className="mt-2 text-sm font-light text-gray-800 dark:text-gray-200">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link
        to="/"
        className="mt-8 flex items-center space-x-2"
      >
        <span className="text-sm text-midnight hover:underline dark:text-white">Go back home</span>
        <ArrowRightIcon className="h-4 w-4 text-midnight dark:text-white" />
      </Link>

      <div className="mt-16 flex items-center space-x-2 divide-x-2">
        <Link
          to="/contact"
          className="text-sm text-gray-200 hover:underline"
        >
          Contact
        </Link>
        <Link
          to="/blog"
          className="pl-2 text-sm text-gray-200 hover:underline"
        >
          Blog
        </Link>
        <a
          href="https://twitter.com/capreaee"
          className="pl-2 text-sm text-gray-200 hover:underline"
        >
          Twitter
        </a>
      </div>
    </div>
  );
}

export default NotFound;
