import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button, { ButtonProps } from './index';

describe('Button Unit Tests', () => {
  let props: ButtonProps;

  beforeEach(() => {
    props = {
      text: 'Lorem ipsum',
      loading: false,
      spacing: 'default',
      appearance: 'primary',
    };
  });

  it('element is in the page', () => {
    const component = render(<Button {...props} />);
    expect(component.container).toBeInTheDocument();
  });

  it('renders default button with the given text', () => {
    const component = render(<Button {...props} />);
    const expected = props.text;
    const element = component.container.querySelector<HTMLButtonElement>('button');
    const actual = element?.textContent;

    expect(element).toBeInTheDocument();
    expect(actual).toBe(expected);
  });
});
