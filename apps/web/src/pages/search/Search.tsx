import { useSearchParams } from 'react-router-dom';
import { MainLayout } from '../../layouts';
import { useSearchType } from './hooks/useSearchType';
import { useSearchData } from './hooks/useSearchData';
import { useSearchTerm } from './hooks/useSearchTerm';
import { TextField } from '../../components';
import SelectSearchType from './components/SelectSearchType';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import * as Separator from '@radix-ui/react-separator';

function Settings(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const [type, setType] = useSearchType();
  const [term, setTerm] = useSearchTerm();
  const { postsResult, usersResult } = useSearchData(type);

  const onSearchClick = () => {
    if (term === '') {
      searchParams.delete('q');
    } else {
      searchParams.set('q', encodeURIComponent(term));
    }

    setSearchParams(searchParams);
  };

  return (
    <MainLayout>
      <div className="flex w-full flex-col">
        <div className="mt-8 flex h-full w-full items-center border-b border-midnight p-8">
          <TextField
            label=""
            value={term}
            className="w-full"
            placeholder="Type anything to search"
            onChange={(e) => setTerm(e.target.value)}
          />

          <button
            className="group p-0"
            onClick={onSearchClick}
          >
            <MagnifyingGlassIcon className="h-10 w-10 rounded-full p-2 text-midnight group-hover:bg-berry/10 group-hover:text-berry" />
            <span className="sr-only">Search</span>
          </button>

          <Separator.Root
            className="mx-4 h-8 w-[1px] bg-midnight"
            decorative
            orientation="vertical"
          />

          <SelectSearchType
            type={type}
            setType={setType}
          />
        </div>

        {term !== '' && (
          <div className="mt-8 flex w-full justify-center space-x-4">
            <pre>{JSON.stringify(postsResult.data, null, 2)}</pre>
            <pre>{JSON.stringify(usersResult.data, null, 2)}</pre>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Settings;
