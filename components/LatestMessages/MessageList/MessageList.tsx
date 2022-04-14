import React from 'react';

import MessageListItem from './MessageListItem';

export interface MessageListProps {}

const MessageList: React.FC<MessageListProps> = () => {
  const data = [
    {
      id: 1,
      name: 'Octavia Leon',
      username: 'octavialeon"',
      updatedAt: '2022-04-14T08:58:04.633Z',
      latestMessage: 'Curabitur sodales gravida.',
      image: 'https://i.pravatar.cc/1000?img=10',
    },
    {
      id: 2,
      name: 'Zenaida Dyer',
      username: 'zenaidadyer',
      updatedAt: '2022-04-13T19:58:04.633Z',
      latestMessage: 'Nunc porta orci.',
      image: 'https://i.pravatar.cc/1000?img=9',
    },
    {
      id: 3,
      name: 'Katelyn Bennett',
      username: 'katelynbennett',
      updatedAt: '2022-04-13T19:58:04.633Z',
      latestMessage: 'Sed dignissim dolor.',
      image: 'https://i.pravatar.cc/1000?img=10',
    },
  ];

  return (
    <div className="mt-4 h-[85vh] divide-y-2 divide-white overflow-y-auto dark:divide-neutral-600">
      {data.map((item) => (
        <MessageListItem message={item} key={item.id} />
      ))}
    </div>
  );
};

export default MessageList;
