import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

export interface MoreButtonProps {}

const MoreButton: React.FC<MoreButtonProps> = () => {
  return (
    <Link href="/explore">
      <a className="flex justify-end outline-none" tabIndex={-1}>
        <span
          className={clsx(
            'rounded-full',
            'bg-midnight text-white outline-primary',
            'py-1 px-4',
            'text-sm',
            'duration-100 ease-in-out hover:scale-[1.01]',
          )}
          tabIndex={0}
        >
          More
        </span>
      </a>
    </Link>
  );
};

export default MoreButton;
