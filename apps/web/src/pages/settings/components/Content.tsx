import { Tab } from '@headlessui/react';
import { useTabs } from '../hooks/useTabs';
import TabList from './TabList';
import TabPanels from './TabPanels';

function Content(): JSX.Element {
  const { defaultTabIndex, onTabChange } = useTabs();

  return (
    <Tab.Group
      vertical
      defaultIndex={defaultTabIndex}
      onChange={onTabChange}
    >
      <TabList />
      <TabPanels />
    </Tab.Group>
  );
}

export default Content;
