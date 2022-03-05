import type { AppearanceType, SpacingType } from '../common';

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
