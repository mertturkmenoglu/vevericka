import { BellIcon, MailIcon, SearchIcon } from '@heroicons/react/outline';
import { IAppBarIcon } from './IAppBarIcon';

export const appBarIcons: IAppBarIcon[] = [
  {
    Icon: SearchIcon,
    href: '/search',
    isMobileOnly: true,
  },
  {
    Icon: BellIcon,
    href: '/notifications',
    isMobileOnly: false,
  },
  {
    Icon: MailIcon,
    href: '/messages',
    isMobileOnly: false,
  },
];
