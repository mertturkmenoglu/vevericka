import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { ReactComponent as SquirrelLogo } from '../../assets/squirrel.svg';
import { ContactForm } from '../../components';

function Contact(): JSX.Element {
  return (
    <div className="mx-auto mt-16 max-w-5xl">
      <SquirrelLogo
        className="mx-auto h-24 w-24 text-berry"
        viewBox="0 0 512 512"
      />
      <Link
        to="/"
        className="mt-8 flex items-center decoration-midnight hover:underline dark:decoration-neutral-400"
      >
        <ChevronLeftIcon className="h-3 w-3 text-midnight dark:text-neutral-400" />
        <span className="ml-1 text-sm text-midnight dark:text-neutral-400">Back to Home</span>
      </Link>

      <h1 className="mb-2 mt-4 text-4xl font-bold text-midnight dark:text-white">Contact Us</h1>
      <hr />

      <ContactForm className="mx-auto mt-16 w-2/3" />
    </div>
  );
}

export default Contact;
