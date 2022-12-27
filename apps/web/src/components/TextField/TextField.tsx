import React, { useId } from 'react';
import clsx from 'clsx';

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error: {
    type?: string;
    message?: string;
  };
  labelClassName?: string;
  inputClassName?: string;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, labelClassName, inputClassName, className, error, ...props }, ref) => {
    const id = useId();

    return (
      <div className={clsx('flex flex-col', className)}>
        <label
          htmlFor={id}
          className={clsx('block text-sm text-midnight dark:text-white', labelClassName)}
        >
          {label}
        </label>
        <input
          id={id}
          className={clsx(
            'border-b border-midnight dark:border-white dark:px-1',
            {
              'border-red-500': error?.type,
              'focus:border-primary': !error?.type,
            },
            'mt-1 py-2 text-sm font-medium text-midnight',
            'outline-none',
            'placeholder:text-sm placeholder:font-light',
            'dark:placeholder:text-paper-400',
            'dark:text-white',
            inputClassName
          )}
          {...props}
          ref={ref}
        />
        {error?.type && <span className="mt-2 text-sm font-medium text-red-500">{error.message}</span>}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
