import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import Button from './Button';

export default {
  title: 'Atom/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Default Button',
};
