import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { categories } from '../components/categories';

export function useTabs() {
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

  return {
    defaultTabIndex,
    onTabChange,
  };
}
