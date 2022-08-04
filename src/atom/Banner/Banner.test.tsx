import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import mock from './Banner.mock';
import Banner, { BannerProps } from './index';

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
