import Link from 'next/link';
import { appBarIcons } from '../data/appBarIcons';
import clsx from 'clsx';

export interface IconGroupProps {

}

const IconGroup: React.FC<IconGroupProps> = () => {
  return (
    <>
      {appBarIcons.map(({ Icon, href, isMobileOnly }) => (
        <Link href={href} key={href}>
          <a>
            <Icon
              className={clsx('app-bar-icon', { 'sm:hidden': isMobileOnly })}
            />
          </a>
        </Link>
      ))}
    </>
  );
};

export default IconGroup;
