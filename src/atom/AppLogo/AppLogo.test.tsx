import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppLogo, { AppLogoProps } from './AppLogo';

describe('AppLogo Test Suite', () => {
  let props: AppLogoProps;

  beforeEach(() => {
    props = {
      variant: 'icon',
    };
  });

  it('Should render the component', () => {
    const component = render(<AppLogo {...props} />);
    expect(component.container).toBeInTheDocument();
  });
});
