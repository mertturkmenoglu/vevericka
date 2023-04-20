import { useSearchParams } from 'react-router-dom';
import { MainLayout } from '../../layouts';
import { useSearchType } from './hooks/useSearchType';
import { useSearchData } from './hooks/useSearchData';
import { useSearchTerm } from './hooks/useSearchTerm';
import { Loading, TextField } from '../../components';
import SelectSearchType from './components/SelectSearchType';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import * as Separator from '@radix-ui/react-separator';
import SearchResult from './components/SearchResult';
import { Helmet } from 'react-helmet';

function Settings(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const [type, setType] = useSearchType();
  const [term, setTerm] = useSearchTerm();
  const { postsResult, usersResult, search } = useSearchData(type);

  const onSearchClick = () => {
    if (term === '') {
      searchParams.delete('q');
    } else {
      searchParams.set('q', encodeURIComponent(term));
    }

    setSearchParams(searchParams);

    if (term === '') return;
    search(term);
  };

  const getData = () => {
    if (type === 'posts') return postsResult.data?.searchPosts;
    return usersResult.data?.searchUsers;
  };

  const isLoading = postsResult.loading || usersResult.loading;

  const shouldDisplayResults = !isLoading && (getData()?.length ?? 0) > 0;

  return (
    <MainLayout>
      <div className="flex w-full flex-col">
        <Helmet>
          <title>Search | Vevericka</title>
        </Helmet>
        <div className="items-centerp-8 mt-8 flex h-full w-full">
          <TextField
            label=""
            value={term}
            className="w-full"
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                onSearchClick();
              }
            }}
            autoFocus
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

        {isLoading && <Loading className="mx-auto mt-16" />}

        {shouldDisplayResults && (
          <div className="mx-auto my-8 flex w-2/3 flex-col space-y-4">
            {getData()?.map((it, index) => (
              <SearchResult
                key={index}
                type={type}
                content={it}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Settings;
