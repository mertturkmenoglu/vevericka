import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface AppIconProps {
  beforeRouteLeave: () => void;
}

const AppIcon = (props: AppIconProps, ref: React.ForwardedRef<HTMLAnchorElement>) => {
  const { beforeRouteLeave, ...nativeAttributes } = props;
  return (
    <Link href="/">
      <a className="flex items-center" onClick={beforeRouteLeave} ref={ref} {...nativeAttributes}>
        <Image src="/assets/icon_primary.svg" width={48} height={48} alt="Application icon" />
      </a>
    </Link>
  );
};

type AppIconRefType = React.AnchorHTMLAttributes<HTMLAnchorElement> & AppIconProps;

export default React.forwardRef<HTMLAnchorElement, AppIconRefType>(AppIcon);
