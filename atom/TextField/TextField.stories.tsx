import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';
import { useState } from 'react';

import TextField from './TextField';
import { AppearanceAsArray, TextFieldTypeAsArray } from '../common';
import { EyeIcon } from '@heroicons/react/outline';

export default {
  title: 'Atom/TextField',
  component: TextField,
  argTypes: {
    type: {
      options: TextFieldTypeAsArray,
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = (args) => {
  const [value, setValue] = useState('');

  return (
    <div className="storybook-container">
      <TextField {...args} value={value} setValue={setValue} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  appearance: 'primary',
  type: 'text',
  label: 'Lorem Ipsum',
};

const WithHelperAndAppendIconTemplate: ComponentStory<typeof TextField> = (
  args
) => {
  const [value, setValue] = useState('');

  return (
    <div className="storybook-container">
      <TextField {...args} value={value} setValue={setValue} />
    </div>
  );
};

export const WithHelperAndAppendIcon = WithHelperAndAppendIconTemplate.bind({});
WithHelperAndAppendIcon.args = {
  appearance: 'primary',
  type: 'text',
  label: 'Lorem Ipsum',
  helper: <p>Helper text</p>,
  appendIcon: <EyeIcon className="h-5 w-5 text-midnight dark:text-gray-400" />,
};

const AppearanceVariantsTemplate: ComponentStory<typeof TextField> = () => {
  const [value, setValue] = useState('');
  return (
    <div className="storybook-container">
      {AppearanceAsArray.map((appearance, index) => (
        <div key={index} className="mt-4">
          <p className="font-mono text-midnight dark:text-gray-400">
            {appearance}:{' '}
          </p>
          <TextField
            appearance={appearance}
            label="Lorem ipsum"
            type="text"
            value={value}
            setValue={setValue}
            helper={<p>Helper text</p>}
            appendIcon={
              <EyeIcon className="h5-w-5 text-midnight dark:text-gray-400" />
            }
          />
        </div>
      ))}
    </div>
  );
};

export const AppearanceVariants = AppearanceVariantsTemplate.bind({});
