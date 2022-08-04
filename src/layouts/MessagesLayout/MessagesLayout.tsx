import clsx from 'clsx';
import React from 'react';

export interface MessagesLayoutProps {
  className?: string;
}

const MessagesLayout: React.FC<MessagesLayoutProps> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        'grid',
        'mx-auto max-w-[1200px]',
        'grid-cols-12',
        'min-h-[90vh]',
        'min-w-[768px]',
        '',
        '',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default MessagesLayout;
