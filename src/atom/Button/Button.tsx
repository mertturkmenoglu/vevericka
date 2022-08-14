import { ButtonSpacing } from '@atom/common';
import { Spinner } from '@atom/index';
import clsx from 'clsx';
import React, { useMemo } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  loading?: boolean;
  appendIcon?: JSX.Element;
  prependIcon?: JSX.Element;
  rounded?: boolean;
  block?: boolean;
  spacing?: ButtonSpacing;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      text,
      appendIcon,
      prependIcon,
      loading = false,
      rounded = false,
      block = false,
      spacing = 'small',
      className,
      ...props
    },
    ref
  ) => {
    const showAppendIcon = useMemo(() => appendIcon !== undefined && !loading, [appendIcon, loading]);

    const showPrependIcon = useMemo(() => prependIcon !== undefined && !loading, [prependIcon, loading]);

    return (
      <button
        ref={ref}
        className={clsx(
          'flex items-center justify-center',
          'bg-midnight text-white',
          'py-1',
          {
            'w-full': block,
          },
          {
            'rounded-full': rounded,
          },
          className
        )}
        {...props}
      >
        {showAppendIcon && appendIcon}
        {text !== undefined && !loading && text}
        {loading && (
          <Spinner
            appearance="primary"
            spacing={spacing}
          />
        )}
        {showPrependIcon && prependIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
