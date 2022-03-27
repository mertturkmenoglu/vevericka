import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import Banner from './Banner';
import { AppearanceAsArray } from '../common';
import mock from './Banner.mock';
import { CloudIcon, ExclamationCircleIcon, ExclamationIcon } from '@heroicons/react/outline';

export default {
  title: 'Atom/Banner',
  component: Banner,
  argTypes: {
    appearance: {
      options: AppearanceAsArray,
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Banner>;

const PrimaryTemplate: ComponentStory<typeof Banner> = (args) => (
  <div className="storybook-container--full-width">
    <Banner {...args}>
      <div className="flex items-center">
        <CloudIcon className="h-5 w-5 text-white" />
        <span className="ml-2 text-white">Lorem ipsum dolor sit amet</span>
      </div>
    </Banner>
  </div>
);

export const PrimaryBanner = PrimaryTemplate.bind({});
PrimaryBanner.args = {
  ...mock,
  appearance: 'primary',
};

const DangerTemplate: ComponentStory<typeof Banner> = (args) => (
  <div className="storybook-container--full-width">
    <Banner {...args}>
      <div className="flex items-center truncate text-ellipsis">
        <ExclamationCircleIcon className="h-5 w-5 text-white" />
        <span className="ml-2 text-white">
          Oops... Something went wrong. Vevericka is experiencing an incident. Our best squirrels are on it.{' '}
          <a href="/components/banner/examples" className="text-white underline">
            Learn more
          </a>
        </span>
      </div>
    </Banner>
  </div>
);

export const DangerBanner = DangerTemplate.bind({});
DangerBanner.args = {
  ...mock,
  appearance: 'danger',
};

const WarningTemplate: ComponentStory<typeof Banner> = (args) => (
  <div className="storybook-container--full-width">
    <Banner {...args}>
      <div className="flex items-center truncate text-ellipsis">
        <ExclamationIcon className="h-5 w-5 text-midnight" />
        <span className="ml-2 text-midnight">Please update your e-mail information</span>
      </div>
    </Banner>
  </div>
);

export const WarningBanner = WarningTemplate.bind({});
WarningBanner.args = {
  ...mock,
  appearance: 'warning',
};
