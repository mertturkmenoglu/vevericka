import { MagnifyingGlassIcon, BellIcon, EnvelopeIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useFlags } from '../../hooks';

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
  const flags = useFlags();

  const Icon = iconMapping[type];
  const to = toMapping[type];

  return (
    <Link
      to={to}
      className={clsx('flex items-center  p-2 transition ease-in-out hover:bg-midnight/5', {
        'rounded border border-midnight/20': flags.appBarV2,
        'group rounded-full hover:bg-berry/10': !flags.appBarV2,
      })}
    >
      <Icon className="h-5 w-5 text-midnight group-hover:text-berry" />
    </Link>
  );
}

export default AppBarIcon;
