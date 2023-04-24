import { BellIcon, EnvelopeIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import { NovuProvider, PopoverNotificationCenter } from '@novu/notification-center';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useFragment } from '../../generated';
import { UserFragment } from '../../graphql';
import { useAuth, useFlags } from '../../hooks';

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
  const { data } = useAuth();
  const me = useFragment(UserFragment, data?.me);

  const Icon = iconMapping[type];
  const to = toMapping[type];

  if (!me) {
    return <></>;
  }

  if (type === 'notifications') {
    return (
      <NovuProvider
        subscriberId={me.id}
        applicationIdentifier={'Jp_dyLmH8gJi'}
      >
        <PopoverNotificationCenter colorScheme={'light'}>
          {({ unseenCount }) => (
            <button
              className={clsx(
                'relative flex  items-center p-2 transition ease-in-out hover:bg-midnight/5 dark:hover:bg-neutral-600',
                {
                  'rounded border border-midnight/20': flags.appBarV2,
                  'group rounded-full hover:bg-berry/10': !flags.appBarV2,
                }
              )}
            >
              <BellIcon className="h-5 w-5 text-midnight group-hover:text-berry dark:text-white dark:group-hover:text-white" />
              {(unseenCount ?? 0) > 0 && (
                <div className="absolute right-1 top-1 z-10 h-2 w-2 rounded-full bg-berry"></div>
              )}
            </button>
          )}
        </PopoverNotificationCenter>
      </NovuProvider>
    );
  }

  return (
    <Link
      to={to}
      className={clsx('flex items-center p-2 transition ease-in-out hover:bg-midnight/5 dark:hover:bg-neutral-600', {
        'rounded border border-midnight/20': flags.appBarV2,
        'group rounded-full hover:bg-berry/10': !flags.appBarV2,
      })}
    >
      <Icon className="h-5 w-5 text-midnight group-hover:text-berry dark:text-white dark:group-hover:text-white" />
    </Link>
  );
}

export default AppBarIcon;
