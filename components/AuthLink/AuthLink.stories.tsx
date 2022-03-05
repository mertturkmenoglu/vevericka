import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import AuthLink from './AuthLink';

export default {
  title: 'Component/AuthLink',
  component: AuthLink,
} as ComponentMeta<typeof AuthLink>;

const Template: ComponentStory<typeof AuthLink> = (args) => (
  <div className="storybook-container">
    <AuthLink {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  text: 'New user?',
  cta: 'Register',
  href: '#',
};
