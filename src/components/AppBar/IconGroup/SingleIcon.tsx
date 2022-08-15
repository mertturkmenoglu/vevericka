import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

export interface SingleIconProps {
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  href: string;
  isMobileOnly: boolean;
  tooltip: string;
  className?: string;
}

function SingleIcon({ Icon, href, isMobileOnly, tooltip }: SingleIconProps): JSX.Element {
  return (
    <Link href={href}>
      <a>
        <Icon
          className={clsx('ml-2 h-12 w-12 rounded-full p-2 text-primary hover:bg-primary hover:bg-opacity-10', {
            'sm:hidden': isMobileOnly,
          })}
        />
        <span className="sr-only">{tooltip}</span>
      </a>
    </Link>
  );
}

export default SingleIcon;
