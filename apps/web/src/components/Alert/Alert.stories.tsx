import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Alert from './Alert';

export default {
  title: 'Components/Alert',
  component: Alert,
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const Info = Template.bind({});

Info.args = {
  body: <p>A new version is available. Please update your software.</p>,
  accentBorder: false,
  type: 'info',
};

export const InfoWithAccentBorder = Template.bind({});

InfoWithAccentBorder.args = {
  body: <p>A new version is available. Please update your software.</p>,
  accentBorder: true,
  type: 'info',
};
