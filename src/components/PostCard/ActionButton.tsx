import React from 'react';
import clsx from 'clsx';

export interface ActionButtonProps {
  onClick?: () => Promise<void>;
  status: boolean;
  count: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  className?: string;
}

function ActionButton({ onClick, status, count, icon: Icon, className }: ActionButtonProps): JSX.Element {
  return (
    <button
      className={clsx('flex items-center', className)}
      onClick={onClick}
    >
      <Icon
        className={clsx('h-6 w-6', 'text-midnight dark:text-white', {
          'text-primary dark:text-primary': status,
        })}
      />
      <span className="ml-1 text-sm text-midnight dark:text-white">{count}</span>
    </button>
  );
}

export default ActionButton;
