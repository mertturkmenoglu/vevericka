import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

export interface BannerProps {
  className?: string;
  text: string;
  cta?: {
    text: string;
    href: string;
  };
  canDismiss?: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Banner({ text, cta, isOpen, setIsOpen, className, canDismiss = false }: BannerProps): JSX.Element {
  if (!isOpen) {
    return <></>;
  }

  return (
    <div className={clsx('relative flex items-center justify-center bg-black py-1 px-8 text-white', className)}>
      <div className="">{text}</div>
      {cta && (
        <a
          href={cta.href}
          className="ml-2 underline"
        >
          {cta.text}
        </a>
      )}
      {canDismiss && (
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-0 bottom-0"
        >
          <XMarkIcon className="h-4 w-4 text-white" />
        </button>
      )}
    </div>
  );
}

export default Banner;
