import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import mock from './Link.mock';
import Link, { LinkProps } from './index';

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
