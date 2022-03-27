import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Avatar, { AvatarProps } from './index';
import mock from './Avatar.mock';
import axe from 'axe-core';

describe('Avatar Unit Tests', () => {
  let props: AvatarProps;

  beforeEach(() => {
    props = {
      ...mock,
    };
  });

  it('element is in the page', () => {
    const component = render(<Avatar {...props} />);
    expect(component.container).toBeInTheDocument();
  });

  it('Should pass Axe Core A11Y tests', async () => {
    const component = render(<Avatar {...props} />);
    const { rules } = { rules: {} };
    const results = await axe.run(component.baseElement, {
      rules: { ...rules, 'nested-interactive': { enabled: false } },
    });
    expect(results.violations).toHaveLength(0);
  });
});
