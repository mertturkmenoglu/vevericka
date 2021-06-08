import LoginMotto from './LoginMotto.vue';
import {Story, Meta} from '@storybook/vue';

export default {
  title: 'Example/LoginMotto',
  component: LoginMotto,
} as Meta;

const Template: Story<{}> = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LoginMotto },
  template: '<LoginMotto />',
});

export const Component = Template.bind({});
