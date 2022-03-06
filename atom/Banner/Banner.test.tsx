import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Banner, { BannerProps } from './index';
import mock from './Banner.mock';

describe('Banner Unit Tests', () => {
  let props: BannerProps;

  beforeEach(() => {
    props = {
      ...mock,
    };
  });

  it('element is in the page', () => {
    const component = render(<Banner {...props} />);
    expect(component.container).toBeInTheDocument();
  });
});
