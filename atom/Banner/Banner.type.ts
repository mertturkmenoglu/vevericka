import type { AppearanceType } from '../common';

export interface BannerAtomicProps {
  appearance: AppearanceType;
}

export type BannerProps = React.ComponentProps<'div'> & BannerAtomicProps;
