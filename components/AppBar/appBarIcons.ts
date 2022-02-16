import { BellIcon, MailIcon, SearchIcon } from '@heroicons/react/outline';

export const appBarIcons = [
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