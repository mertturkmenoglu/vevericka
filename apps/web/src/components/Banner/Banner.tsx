import { XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import React from 'react';

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
    <div className={clsx('relative flex w-full items-center justify-center bg-black px-8 py-1 text-white', className)}>
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
          className="absolute bottom-0 right-4 top-0"
        >
          <XMarkIcon className="h-4 w-4 text-white" />
        </button>
      )}
    </div>
  );
}

export default Banner;
