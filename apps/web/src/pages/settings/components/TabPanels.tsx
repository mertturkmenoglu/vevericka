import { Tab } from '@headlessui/react';
import { MeQuery } from '../../../generated/graphql';
import { categories } from './categories';

interface Props {
  user: MeQuery;
}

function TabPanels({ user }: Props): JSX.Element {
  return (
    <Tab.Panels className="ml-8 w-full">
      {categories.map((category) => (
        <Tab.Panel key={category.name}>
          <>
            <h2 className="mb-2 text-2xl font-bold text-midnight dark:text-white">{category.name}</h2>
            <hr />
            <category.component user={user} />
          </>
        </Tab.Panel>
      ))}
    </Tab.Panels>
  );
}

export default TabPanels;
