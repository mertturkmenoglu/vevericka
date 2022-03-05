import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Avatar, { AvatarProps } from './Avatar';

describe('Avatar Unit Tests', () => {
  let props: AvatarProps;

  beforeEach(() => {
    props = {
      appearance: 'circle',
      label: 'Lorem ipsum',
      size: 'default',
    };
  });

  it('element is in the page', () => {
    const component = render(<Avatar {...props} />);
    expect(component.container).toBeInTheDocument();
  });
});
