import { LinkAppearanceType } from '../common';
import { LinkProps as NextLinkProps } from 'next/link';

export interface LinkAtomicProps {
  appearance: LinkAppearanceType;
  darkAppearance?: LinkAppearanceType;
}

export type LinkProps = NextLinkProps & LinkAtomicProps;
