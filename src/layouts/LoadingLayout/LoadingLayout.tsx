import React from 'react';
import Spinner from 'src/atom/Spinner/Spinner';
import clsx from 'clsx';

export interface LoadingLayoutProps {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  children: React.ReactNode;
  className?: string;
}

const LoadingLayout: React.FC<LoadingLayoutProps> = ({
  isLoading,
  isError,
  children,
  className,
  errorMessage = 'An error happened',
}) => {
  if (isError) {
    return (
      <div className={clsx('mt-4 flex justify-center', className)}>
        <p>{errorMessage}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={clsx('mt-4 flex justify-center', className)}>
        <Spinner
          appearance="accent"
          spacing="medium"
        />
      </div>
    );
  }

  return <>{children}</>;
};

export default LoadingLayout;
