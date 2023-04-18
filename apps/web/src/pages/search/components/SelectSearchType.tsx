import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import * as Select from '@radix-ui/react-select';
import clsx from 'clsx';
import React from 'react';
import { SearchType } from '../hooks/useSearchType';

export interface SelectSearchTypeProps {
  type: SearchType;
  setType: React.Dispatch<React.SetStateAction<SearchType>>;
}

const SelectItem = React.forwardRef<HTMLDivElement, Select.SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={clsx(
          'relative flex h-6',
          'select-none items-center',
          'rounded px-8 text-sm leading-none text-midnight',
          'data-[highlighted]:bg-berry/10 data-[highlighted]:text-berry data-[highlighted]:outline-none',
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 inline-flex w-8 items-center justify-center">
          <CheckIcon className="h-4 w-4 text-berry" />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

function SelectSearchType({ type, setType }: SelectSearchTypeProps): JSX.Element {
  return (
    <Select.Root
      defaultValue={type}
      onValueChange={(value) => {
        setType(value as SearchType);
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
              <SelectItem value="users">Users</SelectItem>
              <SelectItem value="posts">Posts</SelectItem>
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

export default SelectSearchType;
