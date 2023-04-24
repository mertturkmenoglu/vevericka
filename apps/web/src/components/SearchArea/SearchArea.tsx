import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import * as Separator from '@radix-ui/react-separator';
import clsx from 'clsx';
import React from 'react';
import { SearchType, SearchTypeSelect, TextField } from '..';

export interface SearchAreaProps {
  term: string;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  onSearch: () => void;
  type: SearchType;
  setType: React.Dispatch<React.SetStateAction<SearchType>>;
}

function SearchArea({ term, setTerm, onSearch, type, setType, className }: SearchAreaProps): JSX.Element {
  return (
    <div className={clsx('flex h-full w-full items-center', className)}>
      <TextField
        label=""
        value={term}
        className="w-full"
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            onSearch();
          }
        }}
        autoFocus
        placeholder="Type anything to search"
        onChange={(e) => setTerm(e.target.value)}
      />

      <button
        className="group p-0"
        onClick={onSearch}
      >
        <MagnifyingGlassIcon className="h-10 w-10 rounded-full p-2 text-midnight group-hover:bg-berry/10 group-hover:text-berry dark:text-white dark:group-hover:bg-white/10 dark:group-hover:text-white" />
        <span className="sr-only">Search</span>
      </button>

      <Separator.Root
        className="mx-4 h-8 w-[1px] bg-midnight dark:bg-white"
        decorative
        orientation="vertical"
      />

      <SearchTypeSelect
        type={type}
        setType={setType}
      />
    </div>
  );
}

export default SearchArea;
