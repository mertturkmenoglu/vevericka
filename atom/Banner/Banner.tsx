import { useMemo } from 'react';
import { BannerProps } from './Banner.type';
import clsx from 'clsx';
import { appearanceMapping } from './Banner.variant';

const Banner: React.FC<BannerProps> = ({ appearance, children, className: cs, ...rest }) => {
  const calcAppearance = useMemo(() => appearanceMapping[appearance], [appearance]);

  const className = clsx('flex items-center py-2 px-4 justify-center overflow-ellipsis', calcAppearance, cs);

  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
};

export default Banner;
