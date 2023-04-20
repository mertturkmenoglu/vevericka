import clsx from 'clsx';
import { useState } from 'react';

export interface LazyImageProps {
  src: string;
  placeholderSrc: string;
  alt: string;
  placeholderAlt: string;
  className?: string;
}

function LazyImage({ src, placeholderSrc, alt, placeholderAlt, className }: LazyImageProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <img
        src={placeholderSrc}
        alt={placeholderAlt}
        style={{ display: isLoading ? 'block' : 'none' }}
        className={className}
      />
      <img
        src={src}
        alt={alt}
        style={{ display: isLoading ? 'none' : 'block' }}
        onLoad={() => setIsLoading(false)}
        className={clsx('object-cover', className)}
      />
    </>
  );
}

export default LazyImage;
