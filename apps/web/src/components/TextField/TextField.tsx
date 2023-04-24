import clsx from 'clsx';
import React, { useId } from 'react';

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: {
    type: string;
    message?: string;
  };
  labelClassName?: string;
  inputClassName?: string;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, labelClassName, inputClassName, className, error, ...props }, ref) => {
    const id = useId();

    return (
      <div className={clsx('flex flex-col bg-transparent', className)}>
        <label
          htmlFor={id}
          className={clsx('block text-sm font-semibold text-midnight dark:text-white', labelClassName)}
        >
          {label}
        </label>
        <input
          id={id}
          className={clsx(
            'border-b border-midnight bg-transparent dark:border-neutral-400',
            {
              'border-red-500': error?.type,
              'focus:border-primary': !error?.type,
            },
            'py-2 text-sm font-medium text-midnight dark:text-white',
            'outline-none',
            'placeholder:text-sm placeholder:font-light',
            'disabled:text-neutral-500',
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
