import React from 'react';

import Header from './Header';
import MessageList from './MessageList';

export interface LatestMessagesProps {}

const LatestMessages: React.FC<LatestMessagesProps> = () => {
  return (
    <aside className="h-[90vh] border-r-2 border-midnight border-opacity-10 py-4 text-midnight dark:border-white dark:border-opacity-10">
      <Header />
      <MessageList />
    </aside>
  );
};

export default LatestMessages;
