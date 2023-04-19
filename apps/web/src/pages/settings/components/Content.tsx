import { Tab } from '@headlessui/react';
import { useTabs } from '../hooks/useTabs';
import TabList from './TabList';
import TabPanels from './TabPanels';
import { MeQuery } from '../../../generated/graphql';

interface Props {
  user: MeQuery;
}

function Content({ user }: Props): JSX.Element {
  const { defaultTabIndex, onTabChange } = useTabs();

  return (
    <Tab.Group
      vertical
      defaultIndex={defaultTabIndex}
      onChange={onTabChange}
    >
      <TabList />
      <TabPanels user={user} />
    </Tab.Group>
  );
}

export default Content;
