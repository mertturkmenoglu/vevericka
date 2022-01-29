import Link from 'next/link';
import Image from 'next/image';

export interface LandingAppBarProps {}

const LandingAppBar: React.FC<LandingAppBarProps> = ({}) => {
  return (
    <nav className="flex justify-between items-center bg-white">
      <Link href="/">
        <a className="flex items-center">
          <Image
            src="/assets/icon_primary.svg"
            width={32}
            height={32}
            alt="Application icon"
          />
        </a>
      </Link>

      <div>
        <Link href="/login">
          <a className="font-medium text-gray-800 hover:bg-gray-100 py-2.5 px-3 rounded-full">
            Login
          </a>
        </Link>

        <Link href="/register">
          <a className="font-medium bg-midnight ml-4 py-2.5 px-3 rounded-full text-white">
            Register
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default LandingAppBar;
