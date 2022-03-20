import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Link, { LinkProps } from './index';
import mock from './Link.mock';

describe('Link Unit Tests', () => {
  let props: LinkProps;

  beforeEach(() => {
    props = {
      ...mock,
      href: '#',
    };
  });

  it('element is in the page', () => {
    const component = render(<Link {...props} />);
    expect(component.container).toBeInTheDocument();
  });
});
