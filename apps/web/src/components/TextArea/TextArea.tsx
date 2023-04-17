import React, { useId } from 'react';
import clsx from 'clsx';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: {
    type: string;
    message?: string;
  };
  labelClassName?: string;
  inputClassName?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, labelClassName, inputClassName, className, error, ...props }, ref) => {
    const id = useId();

    return (
      <div className={clsx('flex flex-col', className)}>
        <label
          htmlFor={id}
          className={clsx('block text-sm font-semibold text-midnight', labelClassName)}
        >
          {label}
        </label>
        <textarea
          id={id}
          className={clsx(
            'border-b border-midnight',
            {
              'border-red-500': error?.type,
              'focus:border-primary': !error?.type,
            },
            'py-2 text-sm font-medium text-midnight',
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

TextArea.displayName = 'TextField';

export default TextArea;
