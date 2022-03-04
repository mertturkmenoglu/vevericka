import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import Spinner from './Spinner';

export default {
  title: 'Atom/Spinner',
  component: Spinner,
  parameters: {
    backgrounds: {
      values: [
        { name: 'red', value: '#f00' },
        { name: 'green', value: '#0f0' },
        { name: 'blue', value: '#00f' },
      ],
    },
  },
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args) => <Spinner {...args} />;

export const Default = Template.bind({});
Default.args = {
  appearance: 'primary',
  spacing: 'default',
};
