import { LinkProps as NextLinkProps } from 'next/link';
import { LinkAppearanceType } from '../common';

export interface LinkAtomicProps {
  appearance: LinkAppearanceType;
  darkAppearance?: LinkAppearanceType;
}

export type LinkProps = NextLinkProps & LinkAtomicProps;
