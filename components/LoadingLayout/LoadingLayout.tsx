import React from 'react';
import Spinner from '@atom/Spinner/Spinner';

export interface LoadingLayoutProps {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
}

const LoadingLayout: React.FC<LoadingLayoutProps> = ({
  isLoading,
  isError,
  children,
  errorMessage = 'An error happened',
}) => {
  if (isError) {
    return (
      <div className="mt-4 flex justify-center">
        <p>{errorMessage}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-4 flex justify-center">
        <Spinner appearance="accent" spacing="medium" />
      </div>
    );
  }

  return <>{children}</>;
};

export default LoadingLayout;
