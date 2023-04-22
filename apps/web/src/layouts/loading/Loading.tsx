import { ApolloError } from '@apollo/client';
import clsx from 'clsx';
import React from 'react';
import { Loading } from '../../components';

export interface LoadingLayoutProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  data: T | undefined;
  error: ApolloError | undefined;
  loading: boolean;
  loadingClassName?: string;
  appBarClassName?: string;
}

function LoadingLayout<T>({
  data,
  error,
  loading,
  loadingClassName,
  className,
  children,
  ...props
}: LoadingLayoutProps<T>): JSX.Element {
  return (
    <div
      className={clsx('w-full', className)}
      {...props}
    >
      {loading && (
        <div className={clsx('mx-auto mt-16 flex w-full justify-center', loadingClassName)}>
          <Loading />
        </div>
      )}
      {error && <div>{error.message}</div>}
      {data && <>{children}</>}
    </div>
  );
}

export default LoadingLayout;
