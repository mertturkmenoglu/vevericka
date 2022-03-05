import { AvatarAppearanceType, AvatarSizeType } from '../common';

export interface AvatarAtomicProps {
  appearance: AvatarAppearanceType;
  label: string;
  size: AvatarSizeType;
}

export type AvatarProps = React.ComponentProps<'img'> & AvatarAtomicProps;
