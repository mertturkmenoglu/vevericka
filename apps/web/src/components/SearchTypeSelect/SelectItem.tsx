import { CheckIcon } from '@heroicons/react/24/outline';
import * as Select from '@radix-ui/react-select';
import clsx from 'clsx';
import React from 'react';

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

SelectItem.displayName = 'SearchTypeSelectItem';

export default SelectItem;
