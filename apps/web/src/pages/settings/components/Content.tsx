import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import SidebarItem from './SidebarItem';
import {
  UserIcon,
  IdentificationIcon,
  KeyIcon,
  QuestionMarkCircleIcon,
  LockClosedIcon,
  ComputerDesktopIcon,
  BellIcon,
  CloudIcon,
  EnvelopeIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

const categories = [
  {
    key: 'account',
    name: 'Account',
    icon: UserIcon,
  },
  {
    key: 'profile',
    name: 'Profile',
    icon: IdentificationIcon,
  },
  {
    key: 'display',
    name: 'Display',
    icon: ComputerDesktopIcon,
  },
  {
    key: 'language',
    name: 'Language',
    icon: GlobeAltIcon,
  },
  {
    key: 'notifications',
    name: 'Notifications',
    icon: BellIcon,
  },
  {
    key: 'email',
    name: 'Email Settings',
    icon: EnvelopeIcon,
  },
  {
    key: 'password-and-security',
    name: 'Password and Security',
    icon: KeyIcon,
  },
  {
    key: 'privacy',
    name: 'Privacy',
    icon: LockClosedIcon,
  },
  {
    key: 'your-data',
    name: 'Your Data',
    icon: CloudIcon,
  },
  {
    key: 'help',
    name: 'Help',
    icon: QuestionMarkCircleIcon,
  },
];

function Content(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') ?? 'account';

  const defaultTabIndex = useMemo(() => {
    return categories.findIndex((category) => category.key === activeTab);
  }, [activeTab]);

  const onTabChange = (index: number) => {
    setSearchParams((prev) => ({
      ...prev,
      tab: categories[index].key,
    }));
  };

  const n = 5;

  return (
    <Tab.Group
      vertical
      defaultIndex={defaultTabIndex}
      onChange={onTabChange}
    >
      <Tab.List className="h-fit w-96 space-y-1 rounded border border-gray-400 bg-white p-6">
        {categories.map(({ name, icon }) => (
          <SidebarItem
            key={name}
            name={name}
            icon={icon}
          />
        ))}
      </Tab.List>
      <Tab.Panels className="ml-8 w-full">
        {categories.map((category) => (
          <Tab.Panel
            key={category.name}
            className={clsx(
              'rounded-xl bg-white',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
            )}
          >
            <h2 className="mb-2 text-2xl font-bold text-midnight">{category.name}</h2>
            <hr />
            {new Array(n).fill(0).map((_, index) => (
              <div key={index}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium amet aperiam, molestias tempora
                dolores quibusdam similique rerum vel culpa optio sapiente eaque inventore accusamus ipsam perferendis
                explicabo provident. Provident, doloremque.
              </div>
            ))}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}

export default Content;
