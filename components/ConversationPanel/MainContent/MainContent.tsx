import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { formatDistanceToNowStrict } from 'date-fns';
import { getDateLocaleFromRouterLocale } from '@utils/index';

export interface MainContentProps {
  messages: any[];
}

const MainContent: React.FC<MainContentProps> = ({ messages }) => {
  const isThisUser = useCallback((username: string) => {
    return username === 'thisUsername';
  }, []);

  const isPrevDifferent = (index: number): boolean => {
    if (!messages[index] || !messages[index - 1]) {
      return true;
    }

    return messages[index].username !== messages[index - 1].username;
  };

  const isNextDifferent = (index: number): boolean => {
    if (!messages[index] || !messages[index + 1]) {
      return true;
    }

    return messages[index].username !== messages[index + 1].username;
  };

  const router = useRouter();
  const dateLocal = useMemo(() => getDateLocaleFromRouterLocale(router.locale), [router]);

  const getTimeInfo = useCallback(
    (text: string) => {
      return formatDistanceToNowStrict(new Date(text), { locale: dateLocal, addSuffix: true });
    },
    [dateLocal],
  );

  return (
    <div className="my-2 flex h-[78vh] flex-grow flex-col overflow-y-scroll px-2">
      {messages.map((message, i) => (
        <div
          key={message.id}
          className={clsx(
            {
              'mt-4': isPrevDifferent(i),
              'mt-1': !isPrevDifferent(i),
            },
            {
              'mb-4': isNextDifferent(i),
              'mb-0': !isNextDifferent(i),
            },
            'py-1 px-2',
            'max-w-xs',
            'rounded-lg',
            {
              'bg-neutral-200 dark:bg-neutral-800': !isThisUser(message.username),
              'bg-primary bg-opacity-80 dark:bg-primary dark:bg-opacity-80': isThisUser(message.username),
            },
            {
              'text-midnight dark:text-white': !isThisUser(message.username),
              'text-white': isThisUser(message.username),
            },
            {
              'self-end text-right': isThisUser(message.username),
              'self-start': !isThisUser(message.username),
            },
            'flex flex-col',
          )}
        >
          <span className="text-sm">{message.content}</span>
          <span className="text-xs text-[10px] font-light opacity-50">{getTimeInfo(message.createdAt)}</span>
        </div>
      ))}
    </div>
  );
};

export default MainContent;
