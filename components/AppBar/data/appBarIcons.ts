import { BellIcon, MailIcon, SearchIcon } from '@heroicons/react/outline';
import { IAppBarIcon } from './IAppBarIcon';

export const appBarIcons: IAppBarIcon[] = [
  {
    Icon: SearchIcon,
    href: '/search',
    isMobileOnly: true,
    tooltip: 'icons.tooltips.search',
  },
  {
    Icon: BellIcon,
    href: '/notifications',
    isMobileOnly: false,
    tooltip: 'icons.tooltips.notifications',
  },
  {
    Icon: MailIcon,
    href: '/messages',
    isMobileOnly: false,
    tooltip: 'icons.tooltips.messages',
  },
];
