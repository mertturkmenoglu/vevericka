import * as React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import AuthStepper from './index';

export default {
  title: 'Component/AuthStepper',
  component: AuthStepper,
} as ComponentMeta<typeof AuthStepper>;

const Template: ComponentStory<typeof AuthStepper> = () => (
  <div className="container border border-midnight">
    <AuthStepper>
      <AuthStepper.Step>Step 1</AuthStepper.Step>
      <AuthStepper.Step>Step 2</AuthStepper.Step>
      <AuthStepper.Step>Step 3</AuthStepper.Step>
    </AuthStepper>
  </div>
);

export const Default = Template.bind({});
Default.args = {};
