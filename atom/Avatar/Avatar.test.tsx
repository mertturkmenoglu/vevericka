import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Avatar, { AvatarProps } from './index';
import mock from './Avatar.mock';

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
});
