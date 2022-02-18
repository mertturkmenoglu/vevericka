import React from 'react';
import Link from 'next/link';

export interface Props {
  beforeRouteLeave: () => void;
  text: string;
}

type LandingCustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & Props;

const LandingCustomLink = (props: LandingCustomLinkProps, ref: React.ForwardedRef<HTMLAnchorElement>) => {
  const { beforeRouteLeave, text, href = '', ...nativeAttributes } = props;
  return (
    <Link href={href}>
      <a
        className='hidden sm:flex font-medium text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-neutral-700 py-2.5 px-3 rounded-full ml-4'
        onClick={beforeRouteLeave}
        ref={ref}
        {...nativeAttributes}
      >
        {text}
      </a>
    </Link>
  );
};

export default React.forwardRef<HTMLAnchorElement, LandingCustomLinkProps>(LandingCustomLink);