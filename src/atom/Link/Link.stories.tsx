import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import { LinkAppearanceAsArray } from '../common';
import Link from './Link';
import mock from './Link.mock';

export default {
  title: 'Atom/Link',
  component: Link,
  argTypes: {
    appearance: {
      options: LinkAppearanceAsArray,
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = (args) => (
  <div className="storybook-container">
    <Link {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  ...mock,
};
