import * as React from 'react';
import { DownloadIcon } from '@heroicons/react/outline';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Button from './Button';

export default {
  title: 'Atom/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Default Button',
  appearance: 'primary',
};

export const WithPrependIcon = Template.bind({});
WithPrependIcon.args = {
  text: 'Download',
  appearance: 'primary',
  prependIcon: <DownloadIcon className="ml-2 h-4 w-4" />,
};

export const WithAppendIcon = Template.bind({});
WithAppendIcon.args = {
  text: 'Download',
  appearance: 'primary',
  appendIcon: <DownloadIcon className="mr-2 h-4 w-4" />,
};
