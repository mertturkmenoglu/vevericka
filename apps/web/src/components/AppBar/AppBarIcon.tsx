import { MagnifyingGlassIcon, BellIcon, EnvelopeIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export interface AppBarIconProps {
  type: 'create' | 'search' | 'notifications' | 'messages';
}

export type AppBarIconType = AppBarIconProps['type'];

const iconMapping = {
  create: PlusIcon,
  search: MagnifyingGlassIcon,
  notifications: BellIcon,
  messages: EnvelopeIcon,
} as const satisfies Record<AppBarIconType, TwIcon>;

const toMapping = {
  create: '/create',
  search: '/search',
  notifications: '/notifications',
  messages: '/messages',
} as const satisfies Record<AppBarIconType, string>;

function AppBarIcon({ type }: AppBarIconProps): JSX.Element {
  const Icon = iconMapping[type];
  const to = toMapping[type];

  return (
    <Link
      to={to}
      className="flex items-center rounded border border-midnight/20 p-2 hover:bg-midnight/5"
    >
      <Icon className="h-5 w-5 text-midnight" />
    </Link>
  );
}

export default AppBarIcon;
