import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import Avatar from './Avatar';
import { AvatarAppearanceAsArray, AvatarSizeAsArray } from '../common';
import mock from './Avatar.mock';

export default {
  title: 'Atom/Avatar',
  component: Avatar,
  argTypes: {
    appearance: {
      options: AvatarAppearanceAsArray,
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => (
  <div className="storybook-container">
    <Avatar {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  ...mock,
};

const AllAppearancesTemplate: ComponentStory<typeof Avatar> = () => (
  <div className="storybook-container flex gap-x-8">
    {AvatarAppearanceAsArray.map((appearance) => (
      <Avatar
        key={appearance}
        appearance={appearance}
        label="Profile Picture"
        size="xlarge"
        src={mock.src}
      />
    ))}
  </div>
);

export const AllAppearance = AllAppearancesTemplate.bind({});

const AllSizesTemplate: ComponentStory<typeof Avatar> = () => (
  <div className="storybook-container flex gap-x-8">
    {AvatarSizeAsArray.map((size) => (
      <Avatar
        key={size}
        appearance="circle"
        label="Profile Picture"
        size={size}
        src={mock.src}
      />
    ))}
  </div>
);

export const AllSizes = AllSizesTemplate.bind({});
