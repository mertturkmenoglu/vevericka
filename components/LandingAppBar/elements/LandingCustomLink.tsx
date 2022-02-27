import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

export interface Props {
  beforeRouteLeave: () => void;
  text: string;
  variant?: 'light' | 'dark';
}

type LandingCustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & Props;

const LandingCustomLink = (props: LandingCustomLinkProps, ref: React.ForwardedRef<HTMLAnchorElement>) => {
  const { beforeRouteLeave, text, variant = 'light', href = '', ...nativeAttributes } = props;
  const className = clsx('ml-4 rounded-full py-2.5 px-3 font-medium', {
    'hidden text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-neutral-700 sm:flex': variant === 'light',
    'text-white bg-midnight': variant === 'dark',
  });

  return (
    <Link href={href}>
      <a className={className} onClick={beforeRouteLeave} ref={ref} {...nativeAttributes}>
        {text}
      </a>
    </Link>
  );
};

export default React.forwardRef<HTMLAnchorElement, LandingCustomLinkProps>(LandingCustomLink);
