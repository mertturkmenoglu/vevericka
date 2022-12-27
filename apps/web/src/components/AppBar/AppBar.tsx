import { ReactComponent as SquirrelLogo } from '../../assets/squirrel.svg';
import clsx from 'clsx';
import { LazyImage } from '../LazyImage';
import { BellIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export interface AppBarProps {
  className?: string;
}

function AppBar({ className }: AppBarProps): JSX.Element {
  return (
    <header className={clsx('container rounded-full bg-zinc-100 py-2 px-8', className)}>
      <nav className="flex items-center justify-between">
        <a
          href="/"
          className="flex w-fit items-center space-x-4"
        >
          <SquirrelLogo
            className="h-10 w-10 text-berry"
            viewBox="0 0 512 512"
          />
          <h2 className="text-lg font-normal">Vevericka</h2>
        </a>

        <div className="flex items-center space-x-4">
          <button className="rounded-full p-2 hover:bg-berry hover:bg-opacity-10">
            <BellIcon className="h-8 w-8 text-berry" />
          </button>

          <button className="rounded-full p-2 hover:bg-berry hover:bg-opacity-10">
            <EnvelopeIcon className="h-8 w-8 text-berry" />
          </button>

          <button className="min-h-10 min-w-10 h-10 w-10">
            <LazyImage
              src="https://i.picsum.photos/id/823/200/200.jpg?hmac=zD0Ti1kYqMOUsfNVS7xtDou-2ECcI0RXYs18C54EdYo"
              alt="User image"
              placeholderSrc="/user.jpg"
              placeholderAlt="Loading"
              className="min-h-10 min-w-10 h-10 w-10 rounded-full border border-2 border-berry"
            />
          </button>
        </div>
      </nav>
    </header>
  );
}

export default AppBar;
