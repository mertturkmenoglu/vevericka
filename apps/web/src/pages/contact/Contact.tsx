import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { ReactComponent as SquirrelLogo } from '../../assets/squirrel.svg';
import { ContactForm } from '../../components';

function Contact(): JSX.Element {
  return (
    <div
      className="mx-auto mt-16 max-w-5xl"
      style={{
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      <SquirrelLogo
        className="mx-auto h-24 w-24 text-berry"
        viewBox="0 0 512 512"
      />
      <Link
        to="/"
        className="mt-8 flex items-center hover:underline"
      >
        <ChevronLeftIcon className="h-3 w-3 text-midnight" />
        <span className="ml-1 text-sm text-midnight">Back to Home</span>
      </Link>

      <h1 className="mb-2 mt-4 text-4xl font-bold">Contact Us</h1>
      <hr />

      <ContactForm className="mx-auto mt-16 w-2/3" />
    </div>
  );
}

export default Contact;
