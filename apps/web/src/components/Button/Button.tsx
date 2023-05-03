import clsx from 'clsx';
import React from 'react';
import { Spinner } from '../Spinner';

const variants = {
  midnight: clsx('bg-midnight text-white', 'dark:bg-neutral-800 dark:text-white'),
} as const satisfies Record<string, string>;

const sizes = {
  small: 'px-2 py-1 text-sm',
  medium: 'px-4 py-1 text-base',
  large: 'px-6 py-2 text-lg',
} as const satisfies Record<string, string>;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  loading?: boolean;
}

const base = clsx('flex w-min items-center rounded');
const transition = clsx('transition ease-in-out hover:bg-opacity-90');

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'midnight', size = 'medium', children, loading, className, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(base, transition, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {children}
        {loading && <Spinner className="ml-2 h-4 w-4 fill-berry text-gray-200" />}
      </button>
    );
  }
);

export default Button;
