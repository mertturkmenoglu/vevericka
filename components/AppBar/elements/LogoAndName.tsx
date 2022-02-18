import AppBarLogo from './AppBarLogo';
import AppName from './AppName';
import Link from 'next/link';

export interface LogoAndNameProps {}

const LogoAndName: React.FC<LogoAndNameProps> = () => {
  return (
    <Link href="/feed">
      <a className="flex items-center">
        <AppBarLogo />
        <AppName />
      </a>
    </Link>
  );
};

export default LogoAndName;
