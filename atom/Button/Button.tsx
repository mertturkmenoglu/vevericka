import { useMemo } from 'react';
import clsx from 'clsx';
import type { AppearanceType, SpacingType } from '../common/';
import { appearanceMapping, spacingMapping } from './Button.variants';
import { SpinnerAppearance } from '../Spinner';
import Spinner from '../Spinner/Spinner';

export interface ButtonAtomicProps {
  appearance: AppearanceType;
  text?: string | undefined;
  loading?: boolean | undefined;
  rounded?: boolean | undefined;
  spacing?: SpacingType | undefined;
  block?: boolean | undefined;
  appendIcon?: JSX.Element | undefined;
  prependIcon?: JSX.Element | undefined;
}

export type ButtonProps = React.ComponentProps<'button'> & ButtonAtomicProps;

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
  const calcSpacing = useMemo(() => {
    return spacingMapping[spacing];
  }, [spacing]);

  const calcAppearance = useMemo(() => {
    return clsx(appearanceMapping[appearance], 'hover:transform hover:scale-[1.01]');
  }, [appearance]);

  const calcBlock = useMemo(() => {
    return clsx({
      'w-full': block,
    });
  }, [block]);

  const className = clsx(
    'flex items-center justify-center',
    calcSpacing,
    calcAppearance,
    calcBlock,
    {
      'rounded-full': rounded,
    },
    cs
  );

  const loadingAppearance = useMemo(() => {
    const map: Record<AppearanceType, SpinnerAppearance> = {
      primary: 'white',
      warning: 'white',
      subtle: 'primary',
      danger: 'white',
      accent: 'white',
    };

    return map[appearance];
  }, [appearance]);

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
