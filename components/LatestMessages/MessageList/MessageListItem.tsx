import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';

import { getDateLocaleFromRouterLocale } from '@utils/index';

export interface MessageListItemProps {
  message: any;
  className?: string;
}

const MessageListItem: React.FC<MessageListItemProps> = ({ message, className }) => {
  const router = useRouter();
  const dateLocal = useMemo(() => getDateLocaleFromRouterLocale(router.locale), [router]);
  const timeInfo = useMemo(() => {
    const date = new Date(message.updatedAt);
    const options = { locale: dateLocal, addSuffix: true };
    return formatDistanceToNowStrict(date, options);
  }, [dateLocal]);

  return (
    <button
      className={clsx(
        'flex items-center justify-between',
        'w-full',
        'py-2 px-2',
        'hover:bg-neutral-800 hover:bg-opacity-10',
        'outline-primary',
        className,
      )}
    >
      <div className="flex items-center">
        <img src={message.image} alt="" className="h-12 w-12 rounded-full" />
        <div className="ml-2 flex flex-col items-start">
          <span className="text-left text-base font-bold text-midnight dark:text-white">{message.name}</span>
          <span className="text-left text-sm text-midnight text-opacity-50 dark:text-white dark:text-opacity-50">
            {message.latestMessage}
          </span>
        </div>
      </div>

      <div className="mr-2 flex justify-end text-right">
        <span className="text-right text-xs text-midnight text-opacity-50 dark:text-white dark:text-opacity-50">
          {timeInfo}
        </span>
      </div>
    </button>
  );
};

export default MessageListItem;
