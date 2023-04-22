import { ChevronDownIcon } from '@heroicons/react/24/outline';
import * as Select from '@radix-ui/react-select';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import SelectItem from './SelectItem';
import { SearchType } from './types';

export interface SearchTypeSelectProps {
  type: SearchType;
  setType: React.Dispatch<React.SetStateAction<SearchType>>;
}

function SearchTypeSelect({ type, setType }: SearchTypeSelectProps): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <Select.Root
      defaultValue={type}
      onValueChange={(value) => {
        setType(value as SearchType);
        searchParams.set('type', value);
        setSearchParams(searchParams);
      }}
    >
      <Select.Trigger
        className="inline-flex h-10 items-center justify-center gap-2 rounded bg-white px-4 text-sm leading-none text-midnight outline-none  data-[placeholder]:text-neutral-300"
        aria-label="Type"
      >
        <Select.Value placeholder="Type" />
        <Select.Icon className="text-midnight">
          <ChevronDownIcon className="h-4 w-4 text-midnight" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="mt-12 overflow-hidden rounded bg-white shadow">
          <Select.Viewport className="p-2">
            <Select.Group>
              <SelectItem value="posts">Posts</SelectItem>
              <SelectItem value="users">Users</SelectItem>
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

export default SearchTypeSelect;
