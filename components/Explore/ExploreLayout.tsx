import React from 'react';
import clsx from 'clsx';
import LoadingLayout from 'layouts/LoadingLayout';

export interface ExploreLayoutProps {
  title: string;
  isLoading: boolean;
  isError: boolean;
  className?: string;
}

const ExploreLayout: React.FC<ExploreLayoutProps> = ({ title, isLoading, isError, children, className }) => {
  return (
    <article className={clsx('rounded-md', 'text-midnight', 'p-2', 'bg-white dark:bg-neutral-800', className)}>
      <h2 className="border-b-2 border-midnight pb-2 text-xl font-bold dark:border-white dark:text-white">{title}</h2>

      <LoadingLayout isLoading={isLoading} isError={isError}>
        {children}
      </LoadingLayout>
    </article>
  );
};

export default ExploreLayout;
