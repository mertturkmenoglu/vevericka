import type { AppearanceType } from '../common';
import clsx from 'clsx';

export const inputBorderColorMapping: Record<AppearanceType, string> = {
  primary: 'border-midnight focus:border-midnight dark:border-gray-600 dark:focus:border-gray-600',
  accent: 'border-primary focus:border-midnight dark:border-primary dark:focus:border-gray-600',
  danger: 'border-red-600 focus:border-midnight dark:border-red-600 dark:focus:border-gray-600',
  warning: 'border-amber-400 focus:border-midnight dark:border-amber-400 dark:focus:border-gray-600',
  subtle:
    'border-gray-600 focus:border-midnight dark:border-midnight dark:border-opacity-80 dark:focus:border-gray-600',
};

export const inputTextColorMapping: Record<AppearanceType, string> = {
  primary: 'text-midnight dark:text-gray-400',
  accent: 'text-primary dark:text-primary',
  danger: 'text-red-600 dark:text-red-600',
  warning: 'text-amber-400 dark:text-amber-400',
  subtle: 'text-midnight opacity-80 dark:gray-400 dark:opacity-80',
};

export const helperTextColorMapping: Record<AppearanceType, string> = {
  primary: 'text-midnight dark:text-gray-400',
  accent: 'text-primary',
  danger: 'text-red-600',
  warning: 'text-amber-400',
  subtle: 'text-midnight opacity-80 dark:text-gray-400',
};

export const labelClasses = clsx(
  'absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform duration-300',
  'text-sm',
  'peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100',
  'peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75',
  'dark:text-gray-400 peer-focus:dark:text-blue-500'
);

export const inputClasses =
  'border-0 border-b-2 text-sm focus:outline-none focus:ring-0 peer block w-full appearance-none bg-transparent py-2.5';
