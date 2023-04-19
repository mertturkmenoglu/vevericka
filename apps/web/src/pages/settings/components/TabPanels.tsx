import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import { categories } from './categories';
import { MeQuery } from '../../../generated/graphql';

interface Props {
  user: MeQuery;
}

function TabPanels({ user }: Props): JSX.Element {
  return (
    <Tab.Panels className="ml-8 w-full">
      {categories.map((category) => (
        <Tab.Panel
          key={category.name}
          className={clsx(
            'rounded-xl bg-white',
            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
          )}
        >
          <>
            <h2 className="mb-2 text-2xl font-bold text-midnight">{category.name}</h2>
            <hr />
            <category.component user={user} />
          </>
        </Tab.Panel>
      ))}
    </Tab.Panels>
  );
}

export default TabPanels;
