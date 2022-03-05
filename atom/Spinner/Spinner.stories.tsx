import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import Spinner from './Spinner';
import { AppearanceAsArray, SpacingTypeAsArray } from '../common';

export default {
  title: 'Atom/Spinner',
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args) => (
  <Spinner {...args} />
);

export const Default = Template.bind({});
Default.args = {
  appearance: 'primary',
  spacing: 'default',
};

Default.argTypes = {
  spacing: {
    options: SpacingTypeAsArray,
    control: { type: 'select' },
  },
};

const AllAppearanceTemplate: ComponentStory<typeof Spinner> = () => {
  return (
    <div className="container grid grid-cols-5 gap-y-8 dark:bg-neutral-800">
      {AppearanceAsArray.map((appearance, i) => {
        return SpacingTypeAsArray.map((spacing, j) => (
          <Spinner
            appearance={appearance}
            spacing={spacing}
            key={`a${i}-s${j}`}
          />
        ));
      })}
    </div>
  );
};

export const AllAppearance = AllAppearanceTemplate.bind({});
