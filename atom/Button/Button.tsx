import { useMemo } from 'react';
import clsx from 'clsx';
import { appearanceMapping, loadingMapping, spacingMapping } from './Button.variants';
import { ButtonProps } from './Button.type';
import Spinner from '@atom/Spinner';

const Button: React.FC<ButtonProps> = ({
  appearance,
  text,
  loading = false,
  rounded = false,
  spacing = 'small',
  block = false,
  appendIcon,
  prependIcon,
  className: cs,
  ...rest
}) => {
  const calcSpacing = useMemo(() => spacingMapping[spacing], [spacing]);

  const calcAppearance = useMemo(
    () => clsx(appearanceMapping[appearance], 'hover:transform hover:scale-[1.01]'),
    [appearance],
  );

  const calcBlock = useMemo(
    () =>
      clsx({
        'w-full': block,
      }),
    [block],
  );

  const className = clsx(
    'flex items-center justify-center',
    calcSpacing,
    calcAppearance,
    calcBlock,
    {
      'rounded-full': rounded,
    },
    cs,
  );

  const loadingAppearance = useMemo(() => loadingMapping[appearance], [appearance]);

  const showPrependIcon = useMemo(() => prependIcon !== undefined && !loading, [prependIcon, loading]);

  const showAppendIcon = useMemo(() => appendIcon !== undefined && !loading, [appendIcon, loading]);

  return (
    <button className={className} {...rest}>
      {showAppendIcon && appendIcon}
      {text !== undefined && !loading && text}
      {loading && <Spinner appearance={loadingAppearance} spacing={spacing} />}
      {showPrependIcon && prependIcon}
    </button>
  );
};

export default Button;
