import clsx from 'clsx';
import React from 'react';

export interface NotificationsLayoutProps {
  className?: string;
  children: React.ReactNode;
}

const NotificationsLayout: React.FC<NotificationsLayoutProps> = ({ children, className }) => {
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
        className
      )}
    >
      {children}
    </div>
  );
};

export default NotificationsLayout;
