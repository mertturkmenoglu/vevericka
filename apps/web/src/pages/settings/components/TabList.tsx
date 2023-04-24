import { Tab } from '@headlessui/react';
import { categories } from './categories';
import SidebarItem from './SidebarItem';

function TabList(): JSX.Element {
  return (
    <Tab.List className="h-fit w-96 space-y-1 rounded border border-gray-400 bg-white p-6 dark:border-none dark:bg-neutral-900">
      {categories.map(({ name, icon }) => (
        <SidebarItem
          key={name}
          name={name}
          icon={icon}
        />
      ))}
    </Tab.List>
  );
}

export default TabList;
