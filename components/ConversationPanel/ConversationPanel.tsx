import React from 'react';
import Header from './Header';
import MainContent from './MainContent';
import NewMessage from './NewMessage';

export interface ConversationPanelProps {}

const ConversationPanel: React.FC<ConversationPanelProps> = () => {
  const a = {
    id: 1,
    name: 'Octavia Leon',
    username: 'octavialeon',
    image: 'https://i.pravatar.cc/1000?img=10',
  };

  const messages = [
    {
      id: 1,
      username: 'octavialeon',
      content: 'Vestibulum at risus laoreet, blandit.',
      createdAt: '2022-04-14T08:58:04.633Z',
    },
    {
      id: 2,
      username: 'octavialeon',
      content: 'Morbi ornare enim nisl, vitae.',
      createdAt: '2022-04-14T08:58:04.633Z',
    },
    {
      id: 3,
      username: 'thisUsername',
      content: 'Fusce at risus id arcu.',
      createdAt: '2022-04-14T08:58:04.633Z',
    },
    {
      id: 4,
      username: 'octavialeon',
      content: 'Nullam pellentesque iaculis enim, id.',
      createdAt: '2022-04-14T08:58:04.633Z',
    },
    {
      id: 5,
      username: 'thisUsername',
      content: 'Donec faucibus lacinia dui sit.',
      createdAt: '2022-04-14T08:58:04.633Z',
    },
    {
      id: 6,
      username: 'octavialeon',
      content: 'Cras eu urna eu eros.',
      createdAt: '2022-04-14T08:58:04.633Z',
    },
    {
      id: 7,
      username: 'octavialeon',
      content:
        'Ut congue felis ut diam rhoncus, ornare tincidunt diam scelerisque. Suspendisse sagittis mattis nunc, ut.',
      createdAt: '2022-04-14T08:58:04.633Z',
    },
    {
      id: 8,
      username: 'octavialeon',
      content:
        'Nullam non mauris non tortor scelerisque aliquam vel a diam. Etiam non mauris porttitor, placerat enim eu, consectetur augue. Vivamus lobortis sollicitudin lectus sed tincidunt. Pellentesque habitant morbi tristique senectus et netus et malesuada fames.',
      createdAt: '2022-04-14T08:58:04.633Z',
    },
    {
      id: 9,
      username: 'octavialeon',
      content: 'In imperdiet tortor eget lacinia tincidunt.',
      createdAt: '2022-04-14T08:58:04.633Z',
    },
    {
      id: 10,
      username: 'octavialeon',
      content: 'Cras sit amet erat ac quam consectetur efficitur',
      createdAt: '2022-04-14T08:58:04.633Z',
    },
    {
      id: 11,
      username: 'octavialeon',
      content: 'Suspendisse auctor augue eu enim dictum tincidunt.',
      createdAt: '2022-04-14T08:58:04.633Z',
    },
    {
      id: 12,
      username: 'octavialeon',
      content: 'Morbi ac augue pellentesque, malesuada libero vel, lobortis lectus.',
      createdAt: '2022-04-14T08:58:04.633Z',
    },
    {
      id: 13,
      username: 'octavialeon',
      content:
        'Cras a sem non ipsum eleifend bibendum a nec lectus. Morbi eleifend risus vel tellus sagittis, sed pharetra nisl tempus. Ut faucibus, augue eget egestas gravida, neque nisi maximus orci, vitae dignissim metus lacus eget purus. Aliquam dignissim vulputate gravida. Vestibulum id ipsum tincidunt, laoreet nisi sit amet, mollis ligula. Aliquam at euismod sem, vel suscipit ante. Curabitur laoreet felis turpis, dignissim posuere velit vestibulum a. Cras dictum augue tellus, quis egestas diam congue in. Vivamus volutpat maximus massa at sollicitudin. Integer vel porttitor ipsum, sit amet porta arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur vitae quam a odio faucibus molestie vel vel orci. Ut malesuada dolor et pretium fermentum. Fusce dapibus ipsum enim, vel tempor massa elementum id. Vestibulum viverra eros sed neque auctor, id luctus tortor congue. Nunc dictum purus id porttitor auctor.',
      createdAt: '2022-04-14T08:58:04.633Z',
    },
    {
      id: 14,
      username: 'thisUsername',
      content: 'Phasellus faucibus elit ut tincidunt feugiat.',
      createdAt: '2022-04-14T08:58:04.633Z',
    },
    {
      id: 15,
      username: 'thisUsername',
      content: 'Proin non ligula non augue laoreet commodo in at nibh.',
      createdAt: '2022-04-14T08:58:04.633Z',
    },
    {
      id: 16,
      username: 'thisUsername',
      content: 'Sed sit amet urna nec lectus convallis porttitor ac vitae elit.',
      createdAt: '2022-04-14T08:58:04.633Z',
    },
    {
      id: 17,
      username: 'octavialeon',
      content: 'Integer laoreet ligula nec velit efficitur ultricies id vitae neque.',
      createdAt: '2022-04-14T08:58:04.633Z',
    },
    {
      id: 18,
      username: 'thisUsername',
      content: 'Proin malesuada odio in elit fermentum aliquet.',
      createdAt: '2022-04-14T08:58:04.633Z',
    },
  ];

  return (
    <div className="flex h-full w-full flex-col">
      <Header chat={a} />

      <MainContent messages={messages} />

      <NewMessage />
    </div>
  );
};

export default ConversationPanel;
