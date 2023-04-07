import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import * as React from 'react';
import clsx from 'clsx';

export const AlertTypeArray = ['warning', 'error', 'success', 'info'] as const;

// eslint-disable-next-line prettier/prettier
export type AlertType = typeof AlertTypeArray[number];

type ColorableProperties = 'background' | 'text' | 'accentBorder';

const typeColorMapping: Record<AlertType, Record<ColorableProperties, string>> = {
  warning: {
    background: 'bg-yellow-100',
    text: 'text-yellow-700',
    accentBorder: 'border-l-4 border-yellow-700',
  },
  error: {
    background: 'bg-red-100',
    text: 'text-red-700',
    accentBorder: 'border-l-4 border-red-700',
  },
  success: {
    background: 'bg-green-100',
    text: 'text-green-700',
    accentBorder: 'border-l-4 border-green-700',
  },
  info: {
    background: 'bg-blue-100',
    text: 'text-blue-700',
    accentBorder: 'border-l-4 border-blue-700',
  },
};

type IconType = (props: React.ComponentProps<'svg'> & { title?: string; titleId?: string }) => JSX.Element;

const typeIconMapping: Record<AlertType, IconType> = {
  warning: ExclamationTriangleIcon,
  error: XCircleIcon,
  success: CheckCircleIcon,
  info: InformationCircleIcon,
};

export interface AlertProps {
  type: AlertType;
  body: JSX.Element;
  isOpen?: boolean;
  onClose?: React.Dispatch<React.SetStateAction<boolean>>;
  canDismiss?: boolean;
  accentBorder?: boolean;
  className?: string;
}

function Alert({
  type,
  body,
  isOpen = true,
  onClose = () => {},
  canDismiss = true,
  accentBorder: isAccentBorderEnabled = false,
  className = '',
}: AlertProps): JSX.Element {
  const { background, text, accentBorder } = typeColorMapping[type];
  const Icon = typeIconMapping[type];

  if (!isOpen) {
    return <></>;
  }

  return (
    <div
      role="alert"
      className={clsx(
        'flex w-fit items-center px-4 py-2',
        background,
        text,
        { [accentBorder]: isAccentBorderEnabled },
        className
      )}
    >
      <Icon className="min-h-4 min-w-4 h-8 w-8 sm:h-4 sm:w-4" />
      <div className="ml-4 text-sm">{body}</div>
      {canDismiss && (
        <button
          className="ml-16"
          onClick={() => onClose(false)}
        >
          <XMarkIcon className="h-4 w-4" />{' '}
        </button>
      )}
    </div>
  );
}

export default Alert;
