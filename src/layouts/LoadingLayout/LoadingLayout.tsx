import React from 'react';
import Spinner from 'src/atom/Spinner/Spinner';

export interface LoadingLayoutProps {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  children: React.ReactNode;
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
